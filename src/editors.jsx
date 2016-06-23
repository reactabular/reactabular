/* eslint-disable no-shadow */
import React from 'react';

const boolean = ({ props } = {}) => {
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

const dropdown = ({
  options,
  fields = {
    name: 'name',
    value: 'value',
  },
  props,
}) => {
  const Dropdown = ({ value, onValue }) => {
    const edit = ({ target: { value } }) => onValue(value); // eslint-disable-line max-len, no-shadow, react/prop-types

    return (
      <select onBlur={edit} onChange={edit} value={value} {...props}>
        {options.map((option, i) =>
          <option key={i} value={option[fields.value]}>
            {option[fields.name]}
          </option>
        )}
      </select>
    );
  };
  Dropdown.propTypes = {
    value: React.PropTypes.string.isRequired,
    onValue: React.PropTypes.func.isRequired,
  };

  return Dropdown;
};

const input = ({ props } = {}) => {
  const Input = ({ value, onValue }) => {
    const onKeyUp = ({ key, target: { value } }) => key === 'Enter' && onValue(value);
    const onBlur = ({ target }) => onValue(target.value); // eslint-disable-line react/prop-types

    return <input defaultValue={value} onKeyUp={onKeyUp} onBlur={onBlur} {...props} />;
  };
  Input.propTypes = {
    value: React.PropTypes.string,
    onValue: React.PropTypes.func,
  };

  return Input;
};

export default {
  boolean,
  dropdown,
  input,
};
