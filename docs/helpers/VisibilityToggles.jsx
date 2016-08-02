import React from 'react';
import uuid from 'uuid';

const VisibilityToggles = ({ columns, onToggleColumn }) => {
  const labelId = `label-${uuid.v4()}`;

  return (
    <div
      className="visibility-toggles"
      style={{ backgroundColor: '#ddd', padding: '1em', margin: '1em' }}
    >
      {columns.filter(column => column.header).map(
        ({ header: { label }, visible }, columnIndex) => (
          <label
            className="visibility-toggle"
            htmlFor={labelId}
            style={{ marginRight: '1em' }}
            key={`visibility-toggle-${columnIndex}`}
          >
            <span>{label}</span>
            <input
              type="checkbox"
              id={labelId}
              style={{ marginLeft: '0.5em' }}
              checked={visible}
              onChange={() => onToggleColumn(columnIndex)}
            />
          </label>
        )
      )}
    </div>
  );
};
VisibilityToggles.propTypes = {
  columns: React.PropTypes.array,
  onToggleColumn: React.PropTypes.func
};

export default VisibilityToggles;
