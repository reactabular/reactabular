import React from 'react';
import { mergeClassNames } from './table/utils';

const edit = ({
  getEditId = () => {},
  getEditProperty = () => {},
  onActivate = () => {},
  onValue = () => {}
} = {}) => editor => {
  const editTransform = (value, extraParameters, props = {}) => {
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

  editTransform.toFormatter = ({ value, extraParameters, props } = {}) => React.createElement( // eslint-disable-line max-len, react/prop-types
    'div', // This cannot return a span because it can have children
    editTransform(value, extraParameters, props)
  );

  return editTransform;
};

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => {
  const sortTransform = (_value, { columnIndex }, { className, ...props } = {}) => {
    const columns = getSortingColumns();
    let headerClass = 'sort sort-none';

    if (columns[columnIndex] !== undefined) {
      headerClass = `sort sort-${columns[columnIndex]}`;
    }

    return {
      ...props,
      className: mergeClassNames(className, headerClass),
      onClick: () => onSort(columnIndex)
    };
  };

  sortTransform.toFormatter = ({ value, extraParameters, props } = {}
  ) => React.createElement( // eslint-disable-line react/prop-types
    'span',
    sortTransform(value, extraParameters, props)
  );

  return sortTransform;
};

export default {
  edit,
  sort
};
