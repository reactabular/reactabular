import React from 'react';
import { Search } from 'reactabular';
import PerPage from './PerPage';

const PrimaryControls = ({
  perPage, columns, rows,
  onPerPage, onSearch,
  ...props
}) => (
  <div {...props}>
    <div className="per-page-container">
      <PerPage value={perPage} onChange={onPerPage} />
    </div>
    <div className="search-container">
      Search <Search columns={columns} rows={rows} onChange={onSearch} />
    </div>
  </div>
);
PrimaryControls.propTypes = {
  perPage: React.PropTypes.number,
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  onPerPage: React.PropTypes.func,
  onSearch: React.PropTypes.func
};

export default PrimaryControls;
