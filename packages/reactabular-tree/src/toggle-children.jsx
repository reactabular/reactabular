import React from 'react';
import getLevel from './get-level';
import hasChildren from './has-children';

const toggleChildren = ({
  getRows,
  getShowingChildren,
  toggleShowingChildren,
  id
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

  const toggle = (e, index) => {
    e.stopPropagation();
    e.preventDefault();

    toggleShowingChildren(index);
  };

  return (value, extra) => {
    const { rowData } = extra;
    const rows = getRows();
    const showingChildren = getShowingChildren(extra);
    const index = rowData._index;

    return (
      <div style={{ paddingLeft: `${getLevel({ rows, index }) * 1}em` }}>
        {hasChildren({ rows, index, id }) && <span
          className={showingChildren ? 'show-less' : 'show-more'}
          onClick={e => toggle(e, index)}
        />}
        {value}
      </div>
    );
  };
};

export default toggleChildren;
