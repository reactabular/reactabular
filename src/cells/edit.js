import React from 'react';

export default function(editProperty, onValue=() => {}, {editor}) {
  const context = this;

  return (value, data, rowIndex, property) => {
    var idx = rowIndex.toString() + '-' + property;
    var editedCell = context.state[editProperty];

    if(editedCell === idx) {
      return {
        value: React.createElement(editor, {
          value,
          onValue: (v) => {
            var state = {};

            state[editProperty] = null;

            context.setState(state);

            onValue(v, data, rowIndex, property);
          }
        }),
      };
    }

    if(editor) {
      return {
        value,
        props: {
          onClick: () => {
            var state = {};

            state[editProperty] = idx;

            context.setState(state);
          },
        }
      };
    }

    return value;
  };
};
