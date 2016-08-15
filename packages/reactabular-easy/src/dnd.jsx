import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import findIndex from 'lodash/findIndex';

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

  const movedColumns = move(columns, sourceIndex, targetIndex);

  return {
    source: movedColumns[sourceIndex],
    target: movedColumns[targetIndex],
    columns: movedColumns
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
const DndHeader = compose(
  DragSource( // eslint-disable-line new-cap
    DragTypes.HEADER, headerSource, connect => ({
      connectDragSource: connect.dragSource()
    })
  ),
  DropTarget( // eslint-disable-line new-cap
    DragTypes.HEADER, headerTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(({
  connectDragSource, connectDropTarget, label, // eslint-disable-line no-unused-vars
  children, onMove, onFinishMove, ...props // eslint-disable-line no-unused-vars
}) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
));

export {
  DndHeader,
  moveLabels
};
