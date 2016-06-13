import React from 'react';

const PerPage = ({ value, onChange }) => (
  <div>
    <span>Per page:</span>
    <input
      type="text"
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
    ></input>
  </div>
);
PerPage.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default PerPage;
