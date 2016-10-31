The following example shows how to handle dragging rows within a tree.

**Example:**

```jsx
/*
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { Table, resolve } from 'reactabular';
import * as tree from 'reactabular-tree';
import * as dnd from 'reactabular-dnd';
*/

const rows = [
  {
    id: 0,
    name: 'Mike Johnson',
    age: 63
  },
  {
    parent: 0,
    id: 1,
    name: 'John White',
    age: 34
  },
  {
    parent: 0,
    id: 2,
    name: 'Fiona Black',
    age: 31
  },
  {
    parent: 2,
    id: 3,
    name: 'Ulrich White',
    age: 74
  },
  {
    id: 4,
    name: 'Zack Yellow',
    age: 52
  }
];

class DragAndDropTreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns: this.getColumns()
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
          format: tree.toggleChildren({
            getRows: () => this.state.rows,
            getShowingChildren: ({ rowData }) => rowData.showingChildren,
            toggleShowingChildren: rowIndex => {
              const rows = cloneDeep(this.state.rows);

              rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;

              this.setState({ rows });
            }
          })
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
      tree.filter('showingChildren'),
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
    const { rows, sourceIndex, targetIndex } = dnd.moveRowsEnhanced({
      rows: this.state.rows,
      sourceRowId,
      targetRowId
    });

    if (rows) {
      const sourceRow = this.state.rows[sourceIndex];
      const targetRow = this.state.rows[targetIndex];
      const sourceChildren = tree.getChildren({
        index: findIndex(this.state.rows, { id: sourceRowId })
      })(this.state.rows);
      const targetChildren = tree.getChildren({
        index: findIndex(this.state.rows, { id: targetRowId })
      })(this.state.rows);

      if (sourceRow.showingChildren) {
        // If open, change children point at the new parent
        sourceChildren.forEach(child => {
          child.parent = targetRow.id;
        });
      } else {
        // TODO: Move possible children if closed
      }

      if (targetRow.showingChildren) {
        // If open, change children point at the new parent
        targetChildren.forEach(child => {
          child.parent = sourceRow.id;
        });
      } else {
        // TODO: Move possible children if closed
      }

      // Swap parents
      const tmpParent = sourceRow.parent;
      sourceRow.parent = targetRow.parent;
      targetRow.parent = tmpParent;

      // Swap showingChildren state
      const tmpShowingChildren = sourceRow.showingChildren;
      sourceRow.showingChildren = targetRow.showingChildren;
      targetRow.showingChildren = tmpShowingChildren;

      this.setState({ rows });
    }
  }
}

// Set up drag and drop context
//const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTreeTable);

<DragAndDropTreeTable />
```
