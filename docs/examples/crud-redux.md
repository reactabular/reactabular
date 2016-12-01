The following example shows how to implement basic editing functionality with Redux.

```jsx
/*
import React from 'react';
import { compose, createStore } from 'redux';
import { connect } from 'react-redux';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import uuid from 'uuid';

import { generateRows } from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    salary: {
      type: 'integer'
    },
    active: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'position', 'salary', 'active']
};

const actions = {
  createRow: () => ({
    type: 'CREATE_ROW',
    row: { name: 'John Doe', id: uuid.v4() }
  }),
  deleteRow: id => ({
    type: 'DELETE_ROW',
    row: { id }
  }),
  editRow: (columnIndex, id) => ({
    type: 'EDIT_ROW',
    row: { columnIndex, id }
  }),
  confirmEdit: (property, value, id) => ({
    type: 'CONFIRM_EDIT',
    row: { property, value, id }
  })
};

const reducer = (state, action) => {
  const row = action.row;
  const index = row && findIndex(state, { id: row.id });

  switch (action.type) {
    case 'CREATE_ROW':
      return [row].concat(state);

    case 'DELETE_ROW':
      if (index >= 0) {
        return state.slice(0, index).concat(state.slice(index + 1));
      }

    case 'EDIT_ROW':
      if (index >= 0) {
        return editProperty(state, index, {
          editing: row.columnIndex
        });
      }

    case 'CONFIRM_EDIT':
      if (index >= 0) {
        return editProperty(state, index, {
          [row.property]: row.value,
          editing: false
        });
      }

    default:
      return state;
  }

  return state;
};

function editProperty(rows, index, values) {
  // Skip mutation, there's likely a neater way to achieve this
  const ret = cloneDeep(rows);

  Object.keys(values).forEach(v => {
    ret[index][v] = values[v];
  });

  return ret;
}

const store = createStore(reducer, generateRows(20, schema));

class CRUDTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns() // initial columns
    };
  }
  getColumns() {
    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        this.props.editRow(columnIndex, rowData.id);
      },
      onValue: ({ value, rowData, property }) => {
        this.props.confirmEdit(property, value, rowData.id);
      }
    });

    return [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [editable(edit.input())]
        }
      },
      {
        property: 'position',
        header: {
          label: 'Position'
        },
        cell: {
          transforms: [editable(edit.input())]
        }
      },
      {
        property: 'salary',
        header: {
          label: 'Salary'
        },
        cell: {
          transforms: [editable(edit.input({ props: { type: 'number' } }))]
        }
      },
      {
        property: 'active',
        header: {
          label: 'Active'
        },
        cell: {
          transforms: [editable(edit.boolean())],
          formatters: [active => active && <span>&#10003;</span>]
        }
      },
      {
        props: {
          style: {
            width: 50
          }
        },
        cell: {
          formatters: [
            (value, { rowData }) => (
              <span
                className="remove"
                onClick={() => this.props.deleteRow(rowData.id)} style={{ cursor: 'pointer' }}
              >
                &#10007;
              </span>
            )
          ]
        }
      }
    ];
  }
  render() {
    const { rows } = this.props;
    const { columns } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <tbody>
            <tr>
              <td><button type="button" onClick={e => {
                e.preventDefault();

                this.props.createRow();
              }}>Add new</button></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

const ConnectedCRUDTable = connect(
  rows => ({ rows }),
  actions
)(CRUDTable);

<ConnectedCRUDTable store={store} />
```
