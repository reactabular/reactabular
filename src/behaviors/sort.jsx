import React from 'react';

export default function (
  {
    getSortingColumns = () => {},
    onSort = () => {},
  },
  property
) {
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
}
