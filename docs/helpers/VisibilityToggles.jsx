import React from 'react';

const VisibilityToggles = ({ columns, onToggleColumn }) => (
  <div
    className="visibility-toggles"
    style={{ backgroundColor: '#ddd', padding: '1em', margin: '1em' }}
  >
    {columns.filter(column => column.header).map(
      ({ header: { label }, visible }, columnIndex) => (
        <label
          className="visibility-toggle"
          style={{ marginRight: '1em' }}
          key={label}
        >
          <span>{label}</span>
          <input
            type="checkbox"
            style={{ marginLeft: '0.5em' }}
            checked={visible}
            onChange={() => onToggleColumn(columnIndex)}
          />
        </label>
      )
    )}
  </div>
);
VisibilityToggles.propTypes = {
  columns: React.PropTypes.array,
  onToggleColumn: React.PropTypes.func
};

export default VisibilityToggles;
