Reactabular doesn't come with inline editing. Instead you can use a package, such as [react-edit](https://www.npmjs.com/package/react-edit), to implement it.

**Example:**

```jsx
/*
import React from 'react';
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
*/

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

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

        // Optional: capture the fact that a field was edited for visualization
        rows[index].edited = true;

        this.setState({ rows });
      }
    });

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          property: 'name',
          header: {
            label: 'Name'
          },
          cell: {
            transforms: [
              (value, extra) => editable(edit.input())(value, extra, {
                className: extra.rowData.edited && 'edited'
              })
            ]
          }
        }
      ],
      rows: [
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
    const { columns, rows } = this.state;

    return (
      <Table.Provider columns={columns}>
        <Table.Header />

        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
  }
}

<EditableTable />
```

## See Also

* [Excel](http://reactabular.js.org/#/examples/excel)
