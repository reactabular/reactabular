import React from 'react';

export default (options, fields={
  name: 'name',
  value: 'value'
}) => {
  const Dropdown = ({value, onValue}) => {
    const edit = e => onValue(e.target.value);

    return (
      <select onBlur={edit} onChange={edit} value={value}>
        {options.map((option, i) =>
          <option
            key={i}
            value={option[fields.value]}
          >{option[fields.name]}</option>
        )}
      </select>
    );
  };
  Dropdown.propTypes = {
    value: React.PropTypes.string,
    onValue: React.PropTypes.func,
  };

  return Dropdown;
}
