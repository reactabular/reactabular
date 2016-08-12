import React from 'react';

const defaultStyles = {
  container: {},
  value: {},
  order: {}
};

const header = ({
  sortable,
  getSortingColumns,
  styles = {}
}) => {
  if (!sortable) {
    throw new Error('header - Missing sortable!');
  }
  if (!getSortingColumns) {
    throw new Error('header - Missing getSortingColumns!');
  }

  const headerStyles = {
    ...defaultStyles,
    ...styles
  };

  return (value, { columnIndex }) => {
    const sortingColumns = getSortingColumns();
    const sortingColumn = (sortingColumns && sortingColumns[columnIndex]) || {};
    const sortingPosition = sortingColumn.position;

    return (
      <div className="sort-container" style={headerStyles.container}>
        <span
          className="sort-value"
          style={headerStyles.value}
        >
          {value}
        </span>
        {{}.hasOwnProperty.call(sortingColumn, 'position') ?
          <span
            className="sort-order"
            style={headerStyles.order}
          >
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
};

export default header;
