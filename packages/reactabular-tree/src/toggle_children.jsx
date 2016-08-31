import React from 'react';
import getLevel from './get_level';
import hasChildren from './has_children';

// XXXXX: The problem is that given this doesn't modify the original row
// data, the toggled rows won't get refreshed. The visibility of children
// needs to become row level data for this to work.
const toggleChildren = ({
  getRows,
  getRowsShowingChildren,
  setRowsShowingChildren
}) => {
  if (!getRows) {
    throw new Error('tree.toggleChildren - Missing getRows!');
  }

  if (!getRowsShowingChildren) {
    throw new Error('tree.toggleChildren - Missing getRowsShowingChildren!');
  }

  if (!setRowsShowingChildren) {
    throw new Error('tree.toggleChildren - Missing setRowsShowingChildren!');
  }

  const toggle = cellIndex => {
    const rowsShowingChildren = getRowsShowingChildren();
    const index = rowsShowingChildren.indexOf(cellIndex);

    setRowsShowingChildren(
      index >= 0 ?
        rowsShowingChildren
        .slice(0, index)
        .concat(
          rowsShowingChildren.slice(index + 1)
        ) :
        rowsShowingChildren.concat([cellIndex])
    );
  };

  return (value, { rowData }) => {
    const rows = getRows();
    const rowsShowingChildren = getRowsShowingChildren();
    const cellIndex = rowData._index;

    return (
      <div style={{ paddingLeft: `${getLevel(rows, cellIndex) * 1}em` }}>
        {hasChildren(rows, cellIndex) && <span
          className={
            rowsShowingChildren.indexOf(cellIndex) >= 0 ?
            'show-less' :
            'show-more'
          }
          onClick={() => toggle(cellIndex)}
        />}
        {value}
      </div>
    );
  };
};

export default toggleChildren;
