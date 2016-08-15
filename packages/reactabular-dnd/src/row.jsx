import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const DragTypes = {
  ROW: 'row'
};
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

const dragSource = DragSource( // eslint-disable-line new-cap
  DragTypes.ROW, rowSource, connect => ({
    connectDragSource: connect.dragSource()
  })
);
const dropTarget = DropTarget( // eslint-disable-line new-cap
  DragTypes.ROW, rowTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })
);
const row = ({
  connectDragSource, connectDropTarget, children,
  onMove, rowId, ...props // eslint-disable-line no-unused-vars
}) => (
  // If you want to drag using a handle instead, then you need to pass
  // connectDragSource to a customized cell (DndCell) through React
  // context and wrap the handle there. You also need to annotate
  // this function using connectDragPreview.
  connectDragSource(connectDropTarget(
    <tr {...props}>{children}</tr>
  ))
);

export default dragSource(dropTarget(row));
