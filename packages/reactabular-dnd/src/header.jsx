import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const DragTypes = {
  HEADER: 'header'
};
const headerSource = {
  beginDrag({ label }) {
    return { label };
  }
};
const headerTarget = {
  hover(targetProps, monitor) {
    const targetLabel = targetProps.label;
    const sourceProps = monitor.getItem();
    const sourceLabel = sourceProps.label;

    if (sourceLabel !== targetLabel && targetProps.onMove) {
      targetProps.onMove({ sourceLabel, targetLabel });
    }
  },
  drop(targetProps) {
    if (targetProps.onFinishMove) {
      targetProps.onFinishMove();
    }
  }
};

const dragSource = DragSource( // eslint-disable-line new-cap
  DragTypes.HEADER, headerSource, connect => ({
    connectDragSource: connect.dragSource()
  })
);
const dropTarget = DropTarget( // eslint-disable-line new-cap
  DragTypes.HEADER, headerTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })
);
const header = ({
  connectDragSource, connectDropTarget, label, // eslint-disable-line no-unused-vars
  children, onMove, onFinishMove, ...props // eslint-disable-line no-unused-vars
}) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
);

export default dragSource(dropTarget(header));
