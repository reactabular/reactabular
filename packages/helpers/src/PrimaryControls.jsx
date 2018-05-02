import React from 'react';
import PropTypes from 'prop-types';
import * as search from 'searchtabular';
import PerPage from './PerPage';

const PrimaryControls = ({
  perPage, columns, rows, column, query,
  onPerPage, onSearch, onColumnChange,
  ...props
}) => (
  <div {...props}>
    <div className="per-page-container">
      <PerPage value={perPage} onChange={onPerPage} />
    </div>
    <div className="search-container">
      <span>Search</span>
      <search.Field
        column={column}
        query={query}
        columns={columns}
        rows={rows}
        onChange={onSearch}
        onColumnChange={onColumnChange}
      />
    </div>
  </div>
);
PrimaryControls.propTypes = {
  perPage: PropTypes.number,
  columns: PropTypes.array,
  rows: PropTypes.array,
  column: PropTypes.string,
  query: PropTypes.object,
  onPerPage: PropTypes.func,
  onSearch: PropTypes.func,
  onColumnChange: PropTypes.func
};

export default PrimaryControls;
