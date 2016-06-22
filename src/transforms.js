import React from 'react';

const edit = (
  {
    getEditId = () => {},
    getEditProperty = () => {},
    onActivate = () => {},
    onValue = () => {},
  },
  editor
) => {
  const Edit = (value, { cellData, property }) => {
    const idx = getEditId({ cellData, property });
    const editedCell = getEditProperty();

    if (editedCell === idx) {
      return {
        children: React.createElement(
          editor,
          {
            value,
            onValue: v => onValue(v, cellData, property),
          }
        ),
      };
    }

    return {
      onClick: () => onActivate(idx),
    };
  };
  Edit.propTypes = {
    value: React.PropTypes.any,
    cellData: React.PropTypes.object.isRequired,
    property: React.PropTypes.string.isRequired,
  };

  return Edit;
};

const sort = (
  {
    getSortingColumns = () => {},
    onSort = () => {},
  },
  property
) => {
  const Sort = () => {
    const columns = getSortingColumns();
    const index = columns.map(c => c.property).indexOf(property);
    let headerClass = '';

    if (index >= 0) {
      headerClass = `sort-${columns[index].sort}`;
    }

    return {
      className: headerClass,
      onClick: () => onSort(property),
    };
  };
  Sort.propTypes = {
    property: React.PropTypes.string.isRequired,
  };

  return Sort;
};

export default {
  edit,
  sort,
};
