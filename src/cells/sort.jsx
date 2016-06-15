import React from 'react';

export default function (
  sortColumn,
  onSort = () => {},
  header
) {
  return ({ property }) => {
    const column = this.state[sortColumn] || {};
    const headerClass = column.property === property ? `sort-${column.sort}` : '';

    return (
      <div
        className={headerClass}
        onClick={() => onSort(property)}
      >
        {header}
      </div>
    );
  };
}
