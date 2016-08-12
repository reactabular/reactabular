import React from 'react';
import { Search } from 'reactabular';
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
      <Search
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
  perPage: React.PropTypes.number,
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  column: React.PropTypes.string,
  query: React.PropTypes.object,
  onPerPage: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onColumnChange: React.PropTypes.func
};

export default PrimaryControls;
