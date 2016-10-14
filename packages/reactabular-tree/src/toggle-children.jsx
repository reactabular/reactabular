import React from 'react';
import getLevel from './get-level';
import hasChildren from './has-children';

const toggleChildren = ({
  getRows,
  getShowingChildren,
  toggleShowingChildren,
  props,
  idField,
  parentField
} = {}) => {
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
    const containsChildren = hasChildren({ index, idField })(rows) ? 'has-children' : '';
    const level = getLevel({ index, parentField })(rows);
    const hasParent = level > 0 ? 'has-parent' : '';

    return (
      <div
        style={{ paddingLeft: `${level}em` }}
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
