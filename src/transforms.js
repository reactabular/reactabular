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
} = {}) => property => {
  const sortTransform = (value, extraParameters, { className, ...props } = {}) => {
    const columns = getSortingColumns();
    const index = columns.map(c => c.property).indexOf(property);
    let headerClass = 'sort sort-none';

    if (index >= 0) {
      headerClass = `sort sort-${columns[index].sort}`;
    }

    return {
      ...props,
      className: mergeClassNames(className, headerClass),
      onClick: () => onSort(property)
    };
  };

  sortTransform.toFormatter = ({ props } = {}) => React.createElement( // eslint-disable-line max-len, react/prop-types
    'span',
    sortTransform(null, null, props)
  );

  return sortTransform;
};

export default {
  edit,
  sort
};
