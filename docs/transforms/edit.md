The `edit` transform has been designed to allow inline editing. It expects you to define how to manipulate the state. it also expects you to pass an editor. Reactabular includes a few, but you can implement your own by following the editing interface.

**Example:**

```code
lang: jsx
---
...
import { transforms, editors } from 'reactabular';

...

// Define how to manipulate data through edit.
const editable = transforms.edit({
  // Get unique editing id for a cell.
  // You can tweak this from outside to control edit.
  getEditId: ({ rowData, property }) => `${rowData.id}-${property}`,

  // Get the edited property
  getEditProperty: () => this.state.editedCell,

  // Set the property when the user tries to activate editing
  onActivate: idx => this.setState({
    editedCell: idx
  }),

  // Capture the value when the user has finished
  onValue: (value, { id }, property) => {
    const idx = findIndex(this.state.data, { id });

    this.state.data[idx][property] = value;

    this.setState({
      editedCell: null,
      data: this.state.data
    });
  },
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
