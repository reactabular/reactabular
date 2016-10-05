/* eslint-disable react/prop-types */
import React from 'react';
import strategies from './strategies';

const defaultStyles = {
  container: {},
  value: {},
  order: {}
};

const header = ({
  sortable,
  getSortingColumns,
  props = {
    container: {},
    value: {},
    order: {}
  },
  // XXXXX: remove in the next major version
  styles = {},
  strategy = strategies.byIndex
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

  return (value, extra) => {
    const sortingColumns = getSortingColumns();
    const sortingColumn = (
      sortingColumns && sortingColumns[extra[strategy.fieldName]]
    ) || {};
    const sortingPosition = sortingColumn.position;

    return (
      <div
        className="sort-container"
        style={headerStyles.container}
        {...props.container}
      >
        <span
          className="sort-value"
          style={headerStyles.value}
          {...props.value}
        >
          {value}
        </span>
        {{}.hasOwnProperty.call(sortingColumn, 'position') ?
          <span
            className="sort-order"
            style={headerStyles.order}
            {...props.order}
          >
            {sortingPosition + 1}
          </span> : null
        }
        {React.createElement(
          'span',
          sortable(
            value,
            extra
          )
        )}
      </div>
    );
  };
};

export default header;
