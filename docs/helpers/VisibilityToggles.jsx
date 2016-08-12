import React from 'react';

const defaultStyles = {
  container: {
    backgroundColor: '#ddd', padding: '1em', margin: '1em' // TODO: push to style.css
  },
  label: {
    marginRight: '1em' // TODO: push to style.css
  },
  toggle: {
    marginLeft: '0.5em' // TODO: push to style.css
  }
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
  columns: React.PropTypes.array,
  onToggleColumn: React.PropTypes.func,
  styles: React.PropTypes.object
};

export default VisibilityToggles;
