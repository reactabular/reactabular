import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const DragTypes = {
  ROW: 'row'
};
const rowSource = {
  beginDrag({ rowId, onMoveStart }) {
    onMoveStart && onMoveStart({ rowId });

    return { rowId };
  },
  endDrag({ rowId, onMoveEnd }) {
    onMoveEnd && onMoveEnd({ rowId });
  }
};
const rowTarget = {
  hover(targetProps, monitor) {
    const targetRowId = targetProps.rowId;
    const sourceProps = monitor.getItem();
    const sourceRowId = sourceProps.rowId;

    // TODO: check if sourceRowId and targetRowId are undefined -> warning
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
const DraggableRow = ({
  _parent,
  connectDragSource, connectDropTarget,
  onMove, rowId, ...props // eslint-disable-line no-unused-vars
}) => (
  // If you want to drag using a handle instead, then you need to pass
  // connectDragSource to a customized cell (DndCell) through React
  // context and wrap the handle there. You also need to annotate
  // this function using connectDragPreview.
  //
  // https://github.com/gaearon/react-dnd/releases/tag/v2.0.0 - ref trick
  React.createElement(
    _parent,
    {
      ...props,
      ref: (e) => {
        if (!e) {
          return;
        }

        const node = findDOMNode(e);

        // Chaining is not allowed
        // https://github.com/gaearon/react-dnd/issues/305#issuecomment-164490014
        connectDropTarget(node);
        connectDragSource(node);
      }
    }
  )
);
DraggableRow.propTypes = {
  _parent: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node
  ]).isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  onMove: React.PropTypes.func.isRequired,
  rowId: React.PropTypes.any.isRequired
};

const draggableRow = (_parent) => {
  function draggable(children) {
    return React.createElement(
      dragSource(dropTarget(DraggableRow)),
      {
        _parent,
        ...children
      }
    );
  }

  // Copy possible shouldComponentUpdate over or otherwise features
  // like virtualization won't work.
  draggable.shouldComponentUpdate = _parent.shouldComponentUpdate;

  return draggable;
};

export default draggableRow;
