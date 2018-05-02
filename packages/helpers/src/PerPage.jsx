import React from 'react';
import PropTypes from 'prop-types';

const PerPage = ({ value, onChange }) => (
  <div>
    <span>Per page:</span>
    <input
      type="text"
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);
PerPage.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default PerPage;
