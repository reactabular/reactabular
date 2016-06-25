Reactabular supports inline editing through a transform and specific `editors` that implement a small editing interface. The `FullTable` example illustrates how to achieve the same result using a modal.

The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` props), your editor should just work with the system.

```react
<EditableTable />
```

```code
lang: jsx
---
import React from 'react';
import { Table, transforms } from 'reactabular';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = transforms.edit({
      // Get unique editing id for a cell.
      // You can tweak this from outside to control edit.
      getEditId: ({ cellData, property }) => `${cellData.id}-${property}`,

      // Get the edited property
      getEditProperty: () => this.state.editedCell,

      // Set the property when the user tries to activate editing
      onActivate: idx => this.setState({
        editedCell: idx,
      }),

      // Capture the value when the user has finished
      onValue: (value, { id }, property) => {
        const idx = findIndex(this.state.data, { id });

        this.state.data[idx][property] = value;

        this.setState({
          editedCell: null,
          data: this.state.data,
        });
      },
    });

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          header: {
            label: 'Name',
          },
          cell: {
            property: 'name',
            transform: editable(editors.input()),
          },
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
        },
        {
          id: 101,
          name: 'Brian',
        },
      ],
    };
  }
  render() {
    const { columns, data } = this.state;

    return (
      <Table columns={columns} data={data}>
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    );
  }
}
```

## Available Editors

```react
<EditorsTable />
```
