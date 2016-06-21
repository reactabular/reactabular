import React from 'react';

export default function (
  {
    getEditProperty = () => {},
    onActivate = () => {},
    onValue = () => {},
  },
  editor
) {
  const Edit = (value, { cellData, property, cellKey }) => {
    const idx = `${cellKey}-${property}`;
    const editedCell = getEditProperty();

    if (editedCell === idx) {
      return React.createElement(
        editor,
        {
          value: cellData[property],
          onValue: v => onValue(v, cellData, property),
        }
      );
    }

    return (
      <span onClick={() => onActivate(idx)}>
        {value}
      </span>
    );
  };
  Edit.propTypes = {
    value: React.PropTypes.any,
    cellData: React.PropTypes.object.isRequired,
    property: React.PropTypes.string.isRequired,
    cellKey: React.PropTypes.string.isRequired,
  };

  return Edit;
}
