import React from 'react';

const edit = ({
  getEditId = () => {},
  getEditProperty = () => {},
  onActivate = () => {},
  onValue = () => {}
} = {}) => editor => {
  const editTransform = (value, extraParameters) => {
    const idx = getEditId(extraParameters);
    const editedCell = getEditProperty();

    if (editedCell === idx) {
      return {
        children: React.createElement(
          editor,
          {
            value,
            onValue: v => onValue(
              { value: v, ...extraParameters }
            )
          }
        )
      };
    }

    return {
      onClick: () => onActivate(idx)
    };
  };

  editTransform.toFormatter = (value, extraParameters) => React.createElement(
    'div', // This cannot return a span because it can have children
    editTransform(value, extraParameters)
  );

  return editTransform;
};

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => () => {
  const sortTransform = (_value, { columnIndex }) => {
    const columns = getSortingColumns();
    let headerClass = 'sort sort-none';

    if (columns[columnIndex] !== undefined) {
      headerClass = `sort sort-${columns[columnIndex]}`;
    }

    return {
      className: headerClass,
      onClick: () => onSort(columnIndex)
    };
  };

  sortTransform.toFormatter = (value, extraParameters) => React.createElement(
    'span',
    sortTransform(value, extraParameters)
  );

  return sortTransform;
};

export default {
  edit,
  sort
};
