import React from 'react';

export default ({ props } = {}) => {
  const Boolean = ({ value, onValue }) => (
    <div {...props}>
      <button
        disabled={value}
        onClick={() => onValue(true)}
      >&#10003;
      </button>
      <button
        disabled={!value}
        onClick={() => onValue(false)}
      >&#10007;
      </button>
    </div>
  );
  Boolean.propTypes = {
    value: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onValue: React.PropTypes.func,
  };

  return Boolean;
};
