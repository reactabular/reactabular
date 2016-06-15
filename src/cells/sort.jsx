import React from 'react';

export default function (
  sortColumn,
  onSort = () => {},
  header
) {
  return ({ property }) => {
    // TODO: generalize as an array so this works with byColumns too (multiple columns!)
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
