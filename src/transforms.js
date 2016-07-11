import React from 'react';
import { mergeClassNames } from './table/utils';

const edit = ({
  getEditId = () => {},
  getEditProperty = () => {},
  onActivate = () => {},
  onValue = () => {}
} = {}) => editor => (value, extraParameters, props = {}) => {
  const idx = getEditId(extraParameters);
  const editedCell = getEditProperty();

  if (editedCell === idx) {
    return {
      children: React.createElement(
        editor,
        {
          ...props,
          value,
          onValue: v => onValue(
            { value: v, ...extraParameters }
          )
        }
      )
    };
  }

  return {
    ...props,
    onClick: () => onActivate(idx)
  };
};

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => (_value, { columnIndex }, { className, ...props } = {}) => {
  const columns = getSortingColumns();
  let headerClass = 'sort sort-none';

  // Check against undefined to allow zero
  if (columns[columnIndex] !== undefined) {
    headerClass = `sort sort-${columns[columnIndex].direction}`;
  }

  return {
    ...props,
    className: mergeClassNames(className, headerClass),
    onClick: () => onSort(columnIndex)
  };
};

const toFormatter = (transform, element = 'div') => (
  React.createElement(
    element,
    transform
  )
);

export default {
  edit,
  sort,
  toFormatter
};
