The following example shows how to implement basic editing functionality.

```jsx
/*
import React from 'react';
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

class CRUDTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: generateRows(20, schema), // initial rows
      columns: this.getColumns() // initial columns
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  getColumns() {
    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index].editing = columnIndex;

        this.setState({ rows });
      },
      onValue: ({ value, rowData, property }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index][property] = value;
        rows[index].editing = false;

        this.setState({ rows });
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
          formatters: [
            active => active && <span>&#10003;</span>
          ]
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
                onClick={() => this.onRemove(rowData.id)} style={{ cursor: 'pointer' }}
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
    const { columns, rows } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <tbody>
            <tr>
              <td><button type="button" onClick={this.onAdd}>Add new</button></td>
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
  onAdd(e) {
    e.preventDefault();

    const rows = cloneDeep(this.state.rows);

    rows.unshift({
      id: uuid.v4(),
      name: 'John Doe'
    });

    this.setState({ rows });
  }
  onRemove(id) {
    const rows = cloneDeep(this.state.rows);
    const idx = findIndex(rows, { id });

    // this could go through flux etc.
    rows.splice(idx, 1);

    this.setState({ rows });
  }
}

<CRUDTable />
```
