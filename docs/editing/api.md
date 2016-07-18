The `edit` transform has been designed to allow inline editing. It expects you to define how to manipulate the state. it also expects you to pass an editor. Reactabular includes a few, but you can implement your own by following the editing interface.

**Example:**

```javascript
...
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { edit } from 'reactabular';

...

// Define how to manipulate rows through edit. As Reactabular doesn't
// manage state, you'll need to define how to do it.
const editable = edit.edit({
  // Determine whether the current cell is being edited or not.
  isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,

  // The user requested activation, mark the current cell as edited.
  // IMPORTANT! If you stash the rows at this.state.rows, DON'T
  // mutate it as that will break Table.Body optimization check.
  onActivate: ({ columnIndex, rowData }) => {
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
      transforms: [editable(edit.input())]
    }
  }
]
```

## Editing Interface

An editor should follow the following interface:

* `({ value, onValue }) => <React element>`

It will receive the current `value` and is expected to emit the result through `onValue` upon completion.

## Editors

```jsx
/*
import React from 'react';
import uuid from 'uuid';
import transform from 'lodash/transform';
import { Table, edit } from 'reactabular';

import countries from './data/countries';
*/

const options = transform(countries, (result, name, value) => {
  result.push({ value, name });
}, []);
const rows = [
  {
    name: 'Boolean',
    editor: edit.boolean(),
    code: 'edit.boolean({ props: <props> })',
    description: `If initial value is true,
      allows setting to false and vice versa.
      Demo value defaults to false always.`,
    id: uuid.v4()
  },
  {
    name: 'Dropdown',
    editor: edit.dropdown({ options }),
    code: 'edit.dropdown({ options: [[<value>, <name>]], props: <props> })',
    description: `The dropdown expects an array
      of value-name object pairs and emits
      the selected one.`,
    id: uuid.v4()
  },
  {
    name: 'Customized dropdown',
    editor: edit.dropdown({
      options,
      fields: {
        // reversing fields to show the API
        name: 'value',
        value: 'name'
      }
    }),
    code: `edit.dropdown(
      {
        options: [[<value>, <name>]],
        fields: {name: <name>, value: <value>},
        props: <props>
      }
    )`,
    description: 'This dropdown uses custom field definition.',
    id: uuid.v4()
  },
  {
    name: 'Input',
    editor: edit.input(),
    code: 'edit.input({ props: <props> })',
    description: 'Just a wrapper for a regular input.',
    id: uuid.v4()
  }
];

const columns = [
  {
    header: {
      label: 'Name'
    },
    cell: {
      property: 'name'
    }
  },
  {
    header: {
      label: 'Editor'
    },
    cell: {
      property: 'editor',
      format: value => React.createElement(value, {
        value: '',
        onValue: v => console.log(v)
      })
    }
  },
  {
    header: {
      label: 'Code'
    },
    cell: {
      property: 'code'
    }
  },
  {
    header: {
      label: 'Description'
    },
    cell: {
      property: 'description'
    }
  }
];

const EditorsTable = () => (
  <Table.Provider
    className="pure-table pure-table-striped"
    columns={columns}
  >
    <Table.Header />

    <Table.Body rows={rows} rowKey="id" />
  </Table.Provider>
);

<EditorsTable />
```

## See Also

* [Excel](/examples/excel)
