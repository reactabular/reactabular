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

  const defaultValueComponent = (value, extraParameters, props) => props;

  return (editorComponent, valueComponent = defaultValueComponent) => {
    if (!editorComponent) {
      throw new Error('edit - Missing editor!');
    }

    return (value, extraParameters, props = {}) => (
      isEditing(extraParameters) ?
      {
        children: React.createElement(
          editorComponent,
          {
            ...props,
            extraParameters,
            [editingProps.value || 'value']: getEditedValue(value),
            [editingProps.onValue || 'onValue']: v => onValue(
              { value: v, ...extraParameters }
            )
          }
        )
      } :
      {
        ...valueComponent(value, extraParameters, props),
        // Override activation, perhaps not so nice
        [activateEvent]: event => onActivate({ event, ...extraParameters })
      }
    );
  };
};

export default edit;
