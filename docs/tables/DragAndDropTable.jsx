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
          header: {
            label: 'Name',
            component: DndHeader,
            transforms: [() => ({
              onMove: this.onMove
            })]
          },
          children: [
            {
              header: {
                label: 'First Name',
                component: DndHeader,
                transforms: [() => ({
                  onMove: this.onMove
                })]
              },
              cell: {
                property: 'name.first'
              }
            },
            {
              header: {
                label: 'Last Name',
                component: DndHeader,
                transforms: [() => ({
                  onMove: this.onMove
                })]
              },
              cell: {
                property: 'name.last'
              }
            }
          ]
        },
        {
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
  onMove({ sourceLabel, targetLabel }) {
    const columns = this.state.columns;

    // XXX: this needs to do a recursive search
    const sourceIndex = findIndex(
      this.state.columns,
      { header: { label: sourceLabel } }
    );

    if (sourceIndex < 0) {
      console.warn('sourceIndex was not found', sourceLabel);

      return;
    }

    const sourceColumn = columns[sourceIndex];
    const targetIndex = findIndex(
      this.state.columns,
      { header: { label: targetLabel } }
    );

    if (targetIndex < 0) {
      console.warn('targetIndex was not found', targetLabel);

      return;
    }

    this.setState({
      columns: update(columns, {
        $splice: [
          [sourceIndex, 1],
          [targetIndex, 0, sourceColumn]
        ]
      })
    });
  }
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
