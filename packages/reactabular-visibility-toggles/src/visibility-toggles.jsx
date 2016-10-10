import React from 'react';

const defaultStyles = {
  container: {},
  label: {},
  toggle: {}
};

const VisibilityToggles = ({
  columns,
  onToggleColumn,
  styles = {},
  ...props
}) => {
  const visibilityStyles = {
    ...defaultStyles,
    ...styles
  };

  return (
    <div
      className="visibility-container"
      style={visibilityStyles.container}
      {...props}
    >
      {columns.filter(column => column.header).map(
        ({ header: { label }, visible }, columnIndex) => {
          const key = `visibility-toggle-${columnIndex}`;

          return (
            <label
              className="visibility-label"
              htmlFor={key}
              style={visibilityStyles.label}
              key={key}
            >
              <span
                className="visibility-value"
                style={visibilityStyles.value}
              >
                {label}
              </span>
              <input
                className="visibility-toggle"
                type="checkbox"
                id={key}
                style={visibilityStyles.toggle}
                checked={visible}
                onChange={() => onToggleColumn(columnIndex)}
              />
            </label>
          );
        }
      )}
    </div>
  );
};
VisibilityToggles.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object),
  onToggleColumn: React.PropTypes.func,
  styles: React.PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default VisibilityToggles;
