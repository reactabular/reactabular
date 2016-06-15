import React from 'react';

export default function (
  editProperty,
  onValue = () => {},
  { editor, formatter = value => value }
) {
  return ({ value, cellData, property, column, cellKey }) => {
    const idx = `${cellKey}-${property}`;
    const editedCell = this.state[editProperty];

    if (editedCell === idx) {
      return React.createElement(
        editor,
        {
          value,
          onValue: (v) => {
            this.setState({ [editProperty]: null });

            onValue(v, cellData, property);
          },
        }
      );
    }

    if (editor) {
      return (
        <span onClick={() => this.setState({ [editProperty]: idx })}>
          {formatter(value)}
        </span>
      );
    }

    return formatter(value);
  };
}
