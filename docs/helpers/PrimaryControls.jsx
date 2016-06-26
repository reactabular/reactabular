import React from 'react';
import Search from './Search';
import PerPage from './PerPage';

const PrimaryControls = ({
  perPage, columns, data,
  onPerPage, onSearch,
  ...props
}) => (
  <div {...props}>
    <div className="per-page-container">
      <PerPage value={perPage} onChange={onPerPage} />
    </div>
    <div className="search-container">
      Search <Search columns={columns} data={data} onChange={onSearch} />
    </div>
  </div>
);
PrimaryControls.propTypes = {
  perPage: React.PropTypes.number,
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  onPerPage: React.PropTypes.func,
  onSearch: React.PropTypes.func
};

export default PrimaryControls;
