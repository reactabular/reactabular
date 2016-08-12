/* eslint-disable no-shadow */
import React from 'react';

const input = ({ props } = {}) => {
  const Input = ({ value, onValue }) => {
    const onKeyUp = ({ key, target: { value } }) => {
      if (key === 'Enter') {
        onValue(parseValue(value));
      }
    };
    const onBlur = ({ target: { value } }) => { // eslint-disable-line react/prop-types
      onValue(parseValue(value));
    };
    const parseValue = v => (value === parseFloat(value) ? parseFloat(v) : v);

    return (
      <input
        defaultValue={value}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        autoFocus
        {...props}
      />
    );
  };
  Input.propTypes = {
    value: React.PropTypes.any,
    onValue: React.PropTypes.func
  };

  return Input;
};

export default input;
