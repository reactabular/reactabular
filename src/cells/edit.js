import React from 'react';

export default function (editProperty, onValue = () => {}, { editor }) {
  const context = this;

  return (value, data, rowIndex, property) => {
    const idx = `${rowIndex.toString()}-${property}`;
    const editedCell = context.state[editProperty];

    if (editedCell === idx) {
      return {
        value: React.createElement(editor, {
          value,
          onValue: (v) => {
            context.setState({ [editProperty]: null });

            onValue(v, data, rowIndex, property);
          },
        }),
      };
    }

    if (editor) {
      return {
        value,
        props: {
          onClick: () => {
            context.setState({ [editProperty]: idx });
          },
        },
      };
    }

    return value;
  };
}
