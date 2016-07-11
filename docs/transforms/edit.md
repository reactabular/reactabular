The `edit` transform has been designed to allow inline editing. It expects you to define how to manipulate the state. it also expects you to pass an editor. Reactabular includes a few, but you can implement your own by following the editing interface.

**Example:**

```code
lang: jsx
---
...
import findIndex from 'lodash/findIndex';
import { transforms, editors } from 'reactabular';

...

// Define how to manipulate data through edit. As Reactabular doesn't
// manage state, you'll need to define how to do it.
const editable = transforms.edit({
  // Generate a unique editing id for a cell.
  // You can tweak this from outside to control which cell is being
  // edited.
  getEditId: ({ rowData, property }) => `${rowData.id}-${property}`,

  // Get the edited property from application state.
  getEditProperty: () => this.state.editedCell,

  // When the user tries to activate editing, capture the editing
  // index to application state. This way the transform is able to
  // tell whether or not something is being edited.
  onActivate: idx => this.setState({
    editedCell: idx
  }),

  // Capture the value when the user has finished and update
  // application state.
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

There's a separate section covering editors that implement this interface.

## See Also

* [Excel](/examples/excel)
