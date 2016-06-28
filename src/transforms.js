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
} = {}) => property => {
  const sortTransform = () => {
    const columns = getSortingColumns();
    const index = columns.map(c => c.property).indexOf(property);
    let headerClass = 'sort sort-none';

    if (index >= 0) {
      headerClass = `sort sort-${columns[index].sort}`;
    }

    return {
      className: headerClass,
      onClick: () => onSort(property)
    };
  };

  sortTransform.toFormatter = () => React.createElement(
    'span',
    sortTransform()
  );

  return sortTransform;
};

export default {
  edit,
  sort
};
