import React from 'react';

const dropdown = ({
  options,
  fields = {
    name: 'name',
    value: 'value'
  },
  props
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
    onValue: React.PropTypes.func.isRequired
  };

  return Dropdown;
};

export default dropdown;
