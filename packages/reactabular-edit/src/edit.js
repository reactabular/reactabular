import React from 'react';

const edit = ({
  isEditing,
  onActivate,
  onValue,
  getEditedValue = v => v,
  editingProps = {},
  activateEvent = 'onClick'
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
            [editingProps.value || 'value']: getEditedValue(value),
            [editingProps.onValue || 'onValue']: v => onValue(
              { value: v, ...extraParameters }
            )
          }
        )
      } :
      {
        ...props,
        [activateEvent]: () => onActivate(extraParameters)
      }
    );
  };
};

export default edit;
