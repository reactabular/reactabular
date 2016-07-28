You can change the position of the columns or rows by dragging them in the example below (mouse only). "First Name" and "Last Name" have been constrained within their parent.

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import findIndex from 'lodash/findIndex';
import { Table, resolve } from 'reactabular';
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
              onMove: o => this.onMove(o)
            }
          },
          children: [
            {
              props: {
                style: {
                  width: 50
                }
              },
              header: {
                label: 'First Name',
                props: {
                  onMove: o => this.onChildMove(o)
                }
              },
              cell: {
                property: 'name.first'
              }
            },
            {
              props: {
                style: {
                  width: 50
                }
              },
              header: {
                label: 'Last Name',
                props: {
                  onMove: o => this.onChildMove(o)
                }
              },
              cell: {
                property: 'name.last'
              }
            }
          ]
        },
        {
          props: {
            style: {
              width: 100
            }
          },
          header: {
            label: 'Company',
            props: {
              onMove: o => this.onMove(o)
            }
          },
          cell: {
            property: 'company'
          }
        },
        {
          props: {
            style: {
              width: 300
            }
          },
          header: {
            label: 'Sentence',
            props: {
              onMove: o => this.onMove(o)
            }
          },
          cell: {
            property: 'sentence'
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
        cell: DndHeader
      },
      body: {
        row: DndRow
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
    const movedRows = moveRows(this.state.rows, { sourceRowId, targetRowId });

    if (movedRows) {
      this.setState({
        rows: movedRows
      });
    }
  }
  onMove(labels) {
    const movedColumns = moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.columns[movedColumns.sourceIndex];
      const target = movedColumns.columns[movedColumns.targetIndex];
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
    const { sourceLabel, targetLabel } = labels;
    const columns = this.state.columns;

    const sourceIndex = findIndex(
      columns,
      column => (
        findIndex(
          column.children,
          { header: { label: sourceLabel } }
        ) >= 0
      )
    );

    if (sourceIndex < 0) {
      return;
    }

    const targetIndex = findIndex(
      columns,
      column => (
        findIndex(
          column.children,
          { header: { label: targetLabel } }
        ) >= 0
      )
    );

    if (targetIndex < 0) {
      return;
    }

    // Allow drag and drop only within the same column
    if (sourceIndex !== targetIndex) {
      return;
    }

    const movedChildren = moveLabels(columns[sourceIndex].children, labels);

    if (movedChildren) {
      columns[sourceIndex].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }
}

function moveRows(rows, { sourceRowId, targetRowId }) {
  const sourceIndex = findIndex(
    rows,
    { id: sourceRowId }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    rows,
    { id: targetRowId }
  );

  if (targetIndex < 0) {
    return null;
  }

  return move(rows, sourceIndex, targetIndex);
}

function moveLabels(columns, { sourceLabel, targetLabel }) {
  const sourceIndex = findIndex(
    columns,
    { header: { label: sourceLabel } }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    { header: { label: targetLabel } }
  );

  if (targetIndex < 0) {
    return null;
  }

  return {
    sourceIndex,
    targetIndex,
    columns: move(columns, sourceIndex, targetIndex)
  };
}

function move(data, sourceIndex, targetIndex) {
  // Idea
  // a, b, c, d, e -> move(b, d) -> a, c, d, b, e
  // a, b, c, d, e -> move(d, a) -> d, a, b, c, e
  // a, b, c, d, e -> move(a, d) -> b, c, d, a, e
  const sourceItem = data[sourceIndex];

  // 1. detach - a, c, d, e - a, b, c, e, - b, c, d, e
  const ret = data.slice(0, sourceIndex).concat(
    data.slice(sourceIndex + 1)
  );

  // 2. attach - a, c, d, b, e - d, a, b, c, e - b, c, d, a, e
  return ret.slice(0, targetIndex).concat([sourceItem]).concat(
    ret.slice(targetIndex)
  );
}

const DragTypes = {
  HEADER: 'header',
  ROW: 'row'
};

const headerSource = {
  beginDrag({ children }) {
    // XXX: This will fail if you use a custom label.
    // A good alternative would be to pass an id through
    // a prop.
    return {
      label: children
    };
  }
};
const headerTarget = {
  hover(targetProps, monitor) {
    const targetLabel = targetProps.children;
    const sourceProps = monitor.getItem();
    const sourceLabel = sourceProps.label;

    if (sourceLabel !== targetLabel) {
      targetProps.onMove({ sourceLabel, targetLabel });
    }
  }
};
const DndHeader = compose(
  DragSource(
    DragTypes.HEADER, headerSource, connect => ({
      connectDragSource: connect.dragSource()
    })
  ),
  DropTarget(
    DragTypes.HEADER, headerTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(({
  connectDragSource, connectDropTarget, children, onMove, ...props
}) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
));

const rowSource = {
  beginDrag({ rowId }) {
    return { rowId };
  }
};
const rowTarget = {
  hover(targetProps, monitor) {
    const targetRowId = targetProps.rowId;
    const sourceProps = monitor.getItem();
    const sourceRowId = sourceProps.rowId;

    if (sourceRowId !== targetRowId) {
      targetProps.onMove({ sourceRowId, targetRowId });
    }
  }
};
const DndRow = compose(
  DragSource(
    DragTypes.ROW, rowSource, connect => ({
      connectDragSource: connect.dragSource()
    })
  ),
  DropTarget(
    DragTypes.ROW, rowTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(({
  connectDragSource, connectDropTarget, children, onMove, rowId, ...props
}) => (
  // If you want to drag using a handle instead, then you need to pass
  // connectDragSource to a customized cell (DndCell) through React
  // context and wrap the handle there. You also need to annotate
  // this function using connectDragPreview.
  connectDragSource(connectDropTarget(
    <tr {...props}>{children}</tr>
  ))
));

const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTable);

<DragAndDrop />
```
