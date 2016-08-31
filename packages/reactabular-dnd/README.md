`reactabular-dnd` provides [React DnD](https://gaearon.github.io/react-dnd/) based helpers for Reactabular.

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
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  },
  {
    id: 3,
    name: {
      first: 'Jake',
      last: 'Jackson'
    },
    company: 'Jake Inc.',
    sentence: 'sed id quo voluptatem voluptatem ut voluptatibus'
  },
  {
    id: 4,
    name: {
      first: 'Don',
      last: 'Donson'
    },
    company: 'Don Inc.',
    sentence: 'voluptatem voluptatem ut voluptatibus'
  }
];

class DragAndDropTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          props: {
            style: {
              width: 100
            }
          },
          header: {
            label: 'Name',
            props: {
              label: 'Name',
              onMove: o => this.onMove(o)
            }
          },
          children: [
            {
              property: 'name.first',
              props: {
                style: {
                  width: 50
                }
              },
              header: {
                label: 'First Name',
                props: {
                  label: 'First Name',
                  onMove: o => this.onChildMove(o)
                }
              }
            },
            {
              property: 'name.last',
              props: {
                style: {
                  width: 50
                }
              },
              header: {
                label: 'Last Name',
                props: {
                  label: 'Last Name',
                  onMove: o => this.onChildMove(o)
                }
              }
            }
          ]
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
            label: 'Company',
            props: {
              onMove: o => this.onMove(o)
            }
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
            label: 'Sentence',
            props: {
              label: 'Sentence',
              onMove: o => this.onMove(o)
            }
          }
        }
      ],
      rows
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onChildMove = this.onChildMove.bind(this);
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
  onMove(labels) {
    const movedColumns = dnd.moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.source;
      const target = movedColumns.target;
      const sourceWidth = source.props.style && source.props.style.width;
      const targetWidth = target.props.style && target.props.style.width;

      source.props.style = {
        ...source.props.style,
        width: targetWidth
      };
      target.props.style = {
        ...target.props.style,
        width: sourceWidth
      };

      this.setState({
        columns: movedColumns.columns
      });
    }
  }
  onChildMove(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }
}

// Set up drag and drop context
//const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTable);

<DragAndDropTable />
```
