import React from 'react';
import findIndex from 'lodash/findIndex';
import {
  transforms, editors, Table
} from '../../src';

export default class EditableTable extends React.Component {
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
        editedCell: idx
      }),

      // Capture the value when the user has finished
      onValue: ({ value, cellData, property }) => {
        const idx = findIndex(this.state.data, { id: cellData.id });

        this.state.data[idx][property] = value;

        this.setState({
          editedCell: null,
          data: this.state.data
        });
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
            transform: editable(editors.input())
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
      <Table columns={columns} data={data} rowKey="id">
        <Table.Header />

        <Table.Body />
      </Table>
    );
  }
}
