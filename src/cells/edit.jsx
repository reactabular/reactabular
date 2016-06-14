import React from 'react';

export default function (
  editProperty,
  onValue = () => {},
  { editor, formatter = value => value }
) {
  const context = this;

  return ({ value, cellData, property, column, cellKey }) => {
    const idx = `${cellKey}-${property}`;
    const editedCell = context.state[editProperty];

    if (editedCell === idx) {
      return React.createElement(
        editor,
        {
          value,
          onValue: (v) => {
            context.setState({ [editProperty]: null });

            onValue(v, cellData, property);
          },
        }
      );
    }

    if (editor) {
      return (
        <span onClick={() => context.setState({ [editProperty]: idx })}>
          {formatter(value)}
        </span>
      );
    }

    return formatter(value);
  };
}
