The following example shows how to handle dragging rows within a tree.

**Example:**

```jsx
/*
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as tree from 'treetabular';
import * as dnd from 'reactabular-dnd';

import {
  generateParents, generateRows
} from './helpers';
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
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age']
};

class DragAndDropTreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows: generateParents(generateRows(100, schema))
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
  }
  getColumns() {
    return [
      {
        property: 'name',
        props: {
          style: { width: 200 }
        },
        header: {
          label: 'Name'
        },
        cell: {
          formatters: [
            tree.toggleChildren({
              getRows: () => this.state.rows,
              getShowingChildren: ({ rowData }) => rowData.showingChildren,
              toggleShowingChildren: rowIndex => {
                const rows = cloneDeep(this.state.rows);

                rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;

                this.setState({ rows });
              }
            })
          ]
        }
      },
      {
        property: 'age',
        props: {
          style: { width: 300 }
        },
        header: {
          label: 'Age'
        }
      }
    ];
  }
  render() {
    const components = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    const { columns } = this.state;
    const rows = compose(
      tree.filter({ fieldName: 'showingChildren' }),
      resolve.resolve({ columns, method: resolve.index })
    )(this.state.rows);

    return (
      <Table.Provider
        components={components}
        columns={columns}
      >
        <Table.Header />

        <Table.Body
          rows={rows}
          rowKey="id"
          onRow={this.onRow}
        />
      </Table.Provider>
    );
  }
  onRow(row) {
    return {
      rowId: row.id,
      onMove: o => this.onMoveRow(o)
    };
  }
  onMoveRow({ sourceRowId, targetRowId }) {
    const rows = tree.moveRows({
      operation: dnd.moveRows({ sourceRowId, targetRowId }),
      retain: ['showingChildren']
    })(this.state.rows);

    if (rows) {
      this.setState({ rows });
    }
  }
}

// Set up drag and drop context
//const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTreeTable);

<DragAndDropTreeTable />
```
