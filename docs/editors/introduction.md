Reactabular supports inline editing through a transform and specific `editors` that implement a small editing interface. The `FullTable` example illustrates how to achieve the same result using a modal.

The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` props), your editor should just work with the system.

**Example:**

```jsx
/*
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import {
  transforms, editors, Table
} from 'reactabular';
*/

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

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

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name',
            transforms: [editable(editors.input())]
          }
        }
      ],
      data: [
        {
          id: 100,
          name: 'Adam'
        },
        {
          id: 101,
          name: 'Brian'
        }
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

<EditableTable />
```
