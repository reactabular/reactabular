import React from 'react';

const edit = ({
  isEditing,
  onActivate,
  onValue,
  getEditedValue = v => v
} = {}) => {
  if (!isEditing) {
    throw new Error('edit - Missing isEditing!');
  }
  if (!onActivate) {
    throw new Error('edit - Missing onActivate!');
  }
  if (!onValue) {
    throw new Error('edit - Missing onValue!');
  }

  return editor => {
    if (!editor) {
      throw new Error('edit - Missing editor!');
    }

    return (value, extraParameters, props = {}) => (
      isEditing(extraParameters) ?
      {
        children: React.createElement(
          editor,
          {
            ...props,
            value: getEditedValue(value),
            onValue: v => onValue(
              { value: v, ...extraParameters }
            )
          }
        )
      } :
      {
        ...props,
        onClick: () => onActivate(extraParameters)
      }
    );
  };
};

const toFormatter = (transform, element = 'div') => (
  React.createElement(
    element,
    transform
  )
);

export default {
  edit,
  toFormatter
};
