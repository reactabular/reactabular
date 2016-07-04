/* eslint-disable new-cap, no-shadow, no-console */
import React from 'react';
import { compose } from 'redux';
import update from 'react-addons-update';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import findIndex from 'lodash/findIndex';
import { Table } from '../../src';

const data = [
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
            component: DndHeader,
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
                component: DndHeader,
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
                component: DndHeader,
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
            component: DndHeader,
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
            component: DndHeader,
            transforms: [() => ({
              onMove: this.onMove
            })]
          },
          cell: {
            property: 'sentence'
          }
        }
      ],
      data
    };

    this.onMove = this.onMove.bind(this);
    this.onChildMove = this.onChildMove.bind(this);
  }
  render() {
    const { columns, data } = this.state;

    return (
      <Table columns={columns} data={data} rowKey="id">
        <Table.Header />

        <Table.Body />
      </Table>
    );
  }
  onMove(labels) {
    const movedColumns = move(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.data[movedColumns.sourceIndex];
      const target = movedColumns.data[movedColumns.targetIndex];
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
        columns: movedColumns.data
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
      columns[sourceIndex].children = movedChildren.data;

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

  return {
    sourceIndex,
    targetIndex,
    data: update(columns, {
      $splice: [
        [sourceIndex, 1],
        [targetIndex, 0, columns[sourceIndex]]
      ]
    })
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
)(({ connectDragSource, connectDropTarget, children, ...props }) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
));

export default DragDropContext(HTML5Backend)(DragAndDropTable);
