`react-edit` provides a set of inline editing related utilities for React. The library comes with a couple of basic editors and you can implement your own as long as you follow the same interface (`value`, `onValue` props).

## API

The `edit` transform has been designed to allow inline editing. It expects you to define how to manipulate the state. it also expects you to pass an editor.

**Example:**

```jsx
...
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import * as edit from 'react-edit';

...

// Define how to manipulate rows through edit.
const editable = edit.edit({
  // Determine whether the current cell is being edited or not.
  isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,

  // The user requested activation, mark the current cell as edited.
  // IMPORTANT! If you stash the rows at this.state.rows, DON'T
  // mutate it as that will break Table.Body optimization check.
  //
  // You also have access to `event` here.
  onActivate: ({ columnIndex, rowData, event }) => {
    event.stopPropagation();

    const index = findIndex(this.state.rows, { id: rowData.id });
    const rows = cloneDeep(this.state.rows);

    rows[index].editing = columnIndex;

    this.setState({ rows });
  },

  // Capture the value when the user has finished and update
  // application state.
  onValue: ({ value, rowData, property }) => {
    const index = findIndex(this.state.rows, { id: rowData.id });
    const rows = cloneDeep(this.state.rows);

    rows[index][property] = value;
    rows[index].editing = false;

    this.setState({ rows });
  },

  // It's possible to shape the value passed to the editor. See
  // the Excel example for a concrete example.
  // getEditedValue: v => v.value

  // If you want to change default value/onValue, you can do it through
  // editingProps: { value: 'value', onValue: 'onValue' }

  // In case you want to trigger activation using something else than
  // onClick, adjust it like this:
  // activateEvent: 'onDoubleClick'
});

...

// Wrap within an element and render.
React.createElement('div', editable(edit.input())(
  value, { columnIndex, rowData }, { ... custom props ... }
), (value, extraParameters, props) => ({
  children: <div>{value}</div>
}));

// Or in JSX
<div {...editable(edit.input())(...)} />
```

## Editing Interface

An editor should follow the following interface:

* `({ value, onValue, extraParameters }) => <React element>`

It will receive the current `value` and is expected to emit the result through `onValue` upon completion. You can capture row data, property name, and such through `extraParameters`.

## Editors

`react-edit` provides a few editors by default:

* `edit.boolean({ props: <props> })` - If the initial value is true, allows setting to false and vice versa. Demo value defaults to false always
* `edit.dropdown({ options: [[<value>, <name>]], props: <props> })` - The dropdown expects an array of value-name object pairs and emits the selected one.
* `edit.input({ props: <props> })` - A wrapper for a regular input.

## Writing a Custom Editor

If you want to implement a custom editor, you should accept `value` and `onValue` prop pair. The former will contain the current value and `onValue` should return a new one. It can be convenient to curry your editor so that you can pass custom `props` to it easily. Consider the following example.

```jsx
/*
import React from 'react';
*/

const boolean = ({ props } = {}) => {
  const Boolean = ({ value, onValue }) => (
    <div {...props}>
      <button
        disabled={value}
        onClick={() => onValue(true)}
      >&#10003;
      </button>
      <button
        disabled={!value}
        onClick={() => onValue(false)}
      >&#10007;
      </button>
    </div>
  );
  Boolean.propTypes = {
    value: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onValue: React.PropTypes.func
  };

  return Boolean;
};

const Boolean = boolean({ style: {
  backgroundColor: '#ddd'
}});

<Boolean value onValue={v => alert(`You chose ${v}`)} />
```
