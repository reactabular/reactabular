The `edit` transform has been designed to allow inline editing. It expects you to define how to manipulate the state. it also expects you to pass an editor. Reactabular includes a few, but you can implement your own by following the editing interface.

**Example:**

```code
lang: jsx
---
...
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { transforms, editors } from 'reactabular';

...

// Define how to manipulate data through edit. As Reactabular doesn't
// manage state, you'll need to define how to do it.
const editable = transforms.edit({
  // Determine whether the current cell is being edited or not.
  isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,

  // The user requested activation, mark the current cell as edited.
  // IMPORTANT! If you stash the data at this.state.data, DON'T
  // mutate it as that will break Table.Body optimization check.
  onActivate: ({ columnIndex, rowData }) => {
    const index = findIndex(this.state.data, { id: rowData.id });
    const data = cloneDeep(this.state.data);

    data[index].editing = columnIndex;

    this.setState({ data });
  },

  // Capture the value when the user has finished and update
  // application state.
  onValue: ({ value, rowData, property }) => {
    const index = findIndex(this.state.data, { id: rowData.id });
    const data = cloneDeep(this.state.data);

    data[index][property] = value;
    data[index].editing = false;

    this.setState({ data });
  }
});

...

// Pass a custom editor to `editable`.
columns: [
  {
    header: {
      label: 'name'
    },
    cell: {
      property: 'name',
      transforms: [editable(editors.input())]
    }
  }
]
```

## Editing Interface

An editor should follow the following interface:

* `({ value, onValue }) => <React element>`

It will receive the current `value` and is expected to emit the result through `onValue` upon completion.

There's a separate section covering editors that implement this interface.

## See Also

* [Excel](/examples/excel)
