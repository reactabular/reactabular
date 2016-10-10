import React from 'react';
import getLevel from './get-level';
import getParents from './get-parents';
import hasChildren from './has-children';

const toggleChildren = ({
  getRows,
  getShowingChildren,
  toggleShowingChildren,
  props,
  id,
  parent
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
    const { className, ...restProps } = props; // eslint-disable-line react/prop-types
    const { rowData } = extra;
    const rows = getRows();
    const showingChildren = getShowingChildren(extra);
    const index = rowData._index;
    const containsChildren = hasChildren({ rows, index, id }) ? 'has-children' : '';
    const hasParent = getParents({ rows, index, parent }).length > 0 ? 'has-parent' : '';

    return (
      <div
        style={{ paddingLeft: `${getLevel({ rows, index }) * 1}em` }}
        onClick={e => toggle(e, index)}
        className={`${containsChildren} ${hasParent} ${className || ''}`}
        {...restProps}
      >
        {containsChildren && <span
          className={showingChildren ? 'show-less' : 'show-more'}
          onClick={e => toggle(e, index)}
        />}
        {value}
      </div>
    );
  };
};

export default toggleChildren;
