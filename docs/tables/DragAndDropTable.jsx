/* eslint-disable new-cap */
import React from 'react';
import { compose } from 'redux';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Table } from '../../src';

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
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Age',
            component: DndHeader,
            transforms: [() => ({
              onMove: this.onMove
            })]
          },
          cell: {
            property: 'age'
          }
        },
        {
          header: {
            label: 'Color',
            component: DndHeader,
            transforms: [() => ({
              onMove: this.onMove
            })]
          },
          cell: {
            property: 'color',
            transforms: [color => ({ style: { color } })]
          }
        }
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 12,
          color: 'red'
        },
        {
          id: 101,
          name: 'Brian',
          age: 44,
          color: 'green'
        },
        {
          id: 102,
          name: 'Mike',
          age: 25,
          color: 'blue'
        }
      ]
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
    console.log('drag and drop', sourceLabel, targetLabel);
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
