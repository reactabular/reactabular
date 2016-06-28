import React from 'react';

const edit = ({
  getEditId = () => {},
  getEditProperty = () => {},
  onActivate = () => {},
  onValue = () => {}
}) => editor => (value, extraParameters) => {
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

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => property => () => {
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

export default {
  edit,
  sort
};
