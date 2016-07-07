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

## Excel Example

```jsx
<ExcelTable />
```

```code
lang: jsx
---
import React from 'react';
import {
  transforms, editors, Table
} from 'reactabular';

export default class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = transforms.edit({
      // Get unique editing id for a cell.
      // You can tweak this from outside to control edit.
      getEditId: ({ columnIndex, rowIndex }) => `${columnIndex}-${rowIndex}`,

      // Get the edited property
      getEditProperty: () => this.state.editedCell,

      // Set the property when the user tries to activate editing
      onActivate: idx => this.setState({
        editedCell: idx
      }),

      // Capture the value when the user has finished
      onValue: ({ value, columnIndex, rowIndex }) => {
        this.state.data[rowIndex][columnIndex - 1] = value;

        this.setState({
          editedCell: null,
          data: this.state.data
        });
      }
    });
    const evaluate = evaluator(() => this.state.data);

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          header: {
            label: ''
          },
          cell: {
            format: (value, { rowIndex }) => rowIndex + 1
          }
        },
        {
          header: {
            label: 'A'
          },
          cell: {
            property: 0,
            transforms: [editable(editors.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'B'
          },
          cell: {
            property: 1,
            transforms: [editable(editors.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'C'
          },
          cell: {
            property: 2,
            transforms: [editable(editors.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'D'
          },
          cell: {
            property: 3,
            transforms: [editable(editors.input())],
            format: evaluate
          }
        }
      ],
      data: [
        ['123', '234', '=A1 + B1', '44'],
        ['11', '1', '5', '56'],
        ['3', '4', '=A1', '88'],
        ['33', '114', '150', '77']
      ]
    };
  }
  render() {
    const { columns, data } = this.state;

    return (
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Header />

        <Table.Body />
      </Table.Provider>
    );
  }
}

function evaluator(getData) {
  const characters = 'ABCD';

  const resolveInput = (data, input, level = 0) => {
    // Recursion trap
    if (level > 10) {
      return input;
    }

    return input.
      trim().
      slice(1).
      split(' ').
      map(
        c => {
          const reference = resolveReference(data, c);

          if (reference[0] === '=') {
            return `(${resolveInput(data, reference.slice(1), level + 1)})`;
          }

          return reference;
        }
      ).
      join(' ');
  };

  const resolveReference = (data, input) => {
    const x = characters.indexOf(input[0]); // Supports just one character
    const y = parseInt(input[1] - 1, 10); // Supports just one number
    const yData = data[y] || [];

    if (x >= 0 && y < yData.length) {
      return data[y][x];
    }

    return input;
  };

  return input => {
    const data = getData();

    if (input[0] === '=') {
      const result = resolveInput(data, input);

      if (result) {
        try {
          return <span style={{ fontWeight: 'bold' }}>{eval(result)}</span>;
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }

      return <span style={{ color: 'red' }}>!ERR</span>;
    }

    return input;
  };
}
```
