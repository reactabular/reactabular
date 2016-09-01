import React from 'react';
import getLevel from './get-level';
import hasChildren from './has-children';

const toggleChildren = ({
  getRows,
  getShowingChildren,
  toggleShowingChildren
}) => {
  if (!getRows) {
    throw new Error('tree.toggleChildren - Missing getRows!');
  }

  if (!getShowingChildren) {
    throw new Error('tree.toggleChildren - Missing getShowingChildren!');
  }

  if (!toggleShowingChildren) {
    throw new Error('tree.toggleChildren - Missing toggleShowingChildren!');
  }

  const toggle = (e, cellIndex) => {
    e.stopPropagation();
    e.preventDefault();

    toggleShowingChildren(cellIndex);
  };

  return (value, extra) => {
    const { rowData } = extra;
    const rows = getRows();
    const showingChildren = getShowingChildren(extra);
    const cellIndex = rowData._index;

    return (
      <div style={{ paddingLeft: `${getLevel(rows, cellIndex) * 1}em` }}>
        {hasChildren(rows, cellIndex) && <span
          className={showingChildren ? 'show-less' : 'show-more'}
          onClick={e => toggle(e, cellIndex)}
        />}
        {value}
      </div>
    );
  };
};

export default toggleChildren;
