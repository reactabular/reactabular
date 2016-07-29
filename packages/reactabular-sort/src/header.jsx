import React from 'react';

const header = ({
  sortable,
  getSortingColumns
}) => (value, { columnIndex }) => {
  const sortingColumns = getSortingColumns();
  const sortingColumn = sortingColumns[columnIndex] || {};
  const sortingPosition = sortingColumn.position;

  return (
    <div style={{ display: 'inline' }}>
      <span className="value">{value}</span>
      {sortingColumn.hasOwnProperty('position') ?
        <span className="sort-order" style={{ marginLeft: '0.5em' }}>
          {sortingPosition + 1}
        </span> : null
      }
      {React.createElement(
        'span',
        sortable(
          value,
          {
            columnIndex
          }
        )
      )}
    </div>
  );
};

export default header;
