You can change the position of the columns by dragging them in the example below (mouse only). "First Name" and "Last Name" have been constrained within their parent.

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import findIndex from 'lodash/findIndex';
import { Table, resolve } from 'reactabular';
*/

const { Table, resolve } = reactabular;

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
            transforms: [() => ({
              onMove: this.onMove
            })]
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
                transforms: [() => ({
                  onMove: this.onChildMove
                })]
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
                transforms: [() => ({
                  onMove: this.onChildMove
                })]
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
            transforms: [() => ({
              onMove: this.onMove
            })]
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
            transforms: [() => ({
              onMove: this.onMove
            })]
          },
          cell: {
            property: 'sentence'
          }
        }
      ],
      rows
    };

    this.onMove = this.onMove.bind(this);
    this.onChildMove = this.onChildMove.bind(this);
  }
  render() {
    const components = {
      header: {
        cell: DndHeader
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
        />
      </Table.Provider>
    );
  }
  onMove(labels) {
    const movedColumns = move(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.rows[movedColumns.sourceIndex];
      const target = movedColumns.rows[movedColumns.targetIndex];
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
        columns: movedColumns.rows
      });
    }
  }
  onChildMove(labels) {
    const { sourceLabel, targetLabel } = labels;
    const columns = this.state.columns;

    const sourceIndex = findIndex(
      columns,
      column => findIndex(column.header.children, { label: sourceLabel })
    );

    if (sourceIndex < 0) {
      return;
    }

    const targetIndex = findIndex(
      columns,
      column => findIndex(column.header.children, { label: targetLabel })
    );

    if (targetIndex < 0) {
      return;
    }

    // Allow drag and drop only within the same column
    if (sourceIndex !== targetIndex) {
      return;
    }

    const movedChildren = move(columns[sourceIndex].children, labels);

    if (movedChildren) {
      columns[sourceIndex].children = movedChildren.rows;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }
}

function move(columns, { sourceLabel, targetLabel }) {
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

  // Idea
  // a, b, c, d, e -> move(b, d) -> a, c, d, b, e
  // a, b, c, d, e -> move(d, a) -> d, a, b, c, e
  // a, b, c, d, e -> move(a, d) -> b, c, d, a, e
  const sourceItem = columns[sourceIndex];

  // 1. detach - a, c, d, e - a, b, c, e, - b, c, d, e
  let cols = columns.slice(0, sourceIndex).concat(
    columns.slice(sourceIndex + 1)
  );

  // 2. attach - a, c, d, b, e - d, a, b, c, e - b, c, d, a, e
  cols = cols.slice(0, targetIndex).concat([sourceItem]).concat(
    cols.slice(targetIndex)
  );

  return {
    sourceIndex,
    targetIndex,
    rows: cols
  };
}

const DragTypes = {
  HEADER: 'header'
};
const headerSource = {
  beginDrag(props) {
    return {
      label: props.children
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
  connectDragSource, connectDropTarget, children, onMove, ...props // eslint-disable-line max-len, no-unused-vars
}) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
));

const DragAndDrop = DragDropContext(HTML5Backend)(DragAndDropTable);

<DragAndDrop />
```
