The following example shows how to handle dragging rows within a tree.

**Example:**

```jsx
/*
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { Table, resolve } from 'reactabular';
import * as dnd from 'reactabular-dnd';
*/

const rows = [
  {
    id: 1,
    name: 'John Johnson',
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    name: 'Mike Mikeson',
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  },
  {
    id: 3,
    name: 'Jake Jackson',
    company: 'Jake Inc.',
    sentence: 'sed id quo voluptatem voluptatem ut voluptatibus'
  },
  {
    id: 4,
    name: 'Don Donson',
    company: 'Don Inc.',
    sentence: 'voluptatem voluptatem ut voluptatibus'
  }
];

class DragAndDropTreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          property: 'name',
          props: {
            style: {
              width: 100
            }
          },
          header: {
            label: 'Name'
          }
        },
        {
          property: 'company',
          props: {
            label: 'Company',
            style: {
              width: 100
            }
          },
          header: {
            label: 'Company'
          }
        },
        {
          property: 'sentence',
          props: {
            style: {
              width: 300
            }
          },
          header: {
            label: 'Sentence'
          }
        }
      ],
      rows
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
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
    const { columns, rows } = this.state;

    return (
      <Table.Provider
        components={components}
        columns={columns}
      >
        <Table.Header />

        <Table.Body
          rows={resolve.resolve({ columns, method: resolve.nested})(rows)}
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
    const movedRows = dnd.moveRows(this.state.rows, { sourceRowId, targetRowId });

    if (movedRows) {
      this.setState({
        rows: movedRows
      });
    }
  }
}

// Set up drag and drop context
//const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTreeTable);

<DragAndDropTreeTable />
```
