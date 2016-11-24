/* eslint-disable react/prop-types */
import React from 'react';
import defaultStrategy from './default-strategy';

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
  strategy = defaultStrategy
}) => {
  if (!sortable) {
    throw new Error('header - Missing sortable!');
  }
  if (!getSortingColumns) {
    throw new Error('header - Missing getSortingColumns!');
  }

  return (value, extra) => {
    const sortingColumns = getSortingColumns();
    const sortingColumn = (
      sortingColumns && sortingColumns[extra[strategy.fieldName]]
    ) || {};
    const sortingPosition = sortingColumn.position;

    return (
      <div
        className="sort-container"
        style={defaultStyles.container}
        {...props.container}
      >
        <span
          className="sort-value"
          style={defaultStyles.value}
          {...props.value}
        >
          {value}
        </span>
        {{}.hasOwnProperty.call(sortingColumn, 'position') ?
          <span
            className="sort-order"
            style={defaultStyles.order}
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
