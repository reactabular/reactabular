import React from 'react';
import {
  transforms, editors, Table
} from '../../src';

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
        this.state.data[rowIndex][columnIndex] = value;

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
            label: 'A'
          },
          cell: {
            property: 0,
            transforms: [editable(editors.input())]
          }
        },
        {
          header: {
            label: 'B'
          },
          cell: {
            property: 1,
            transforms: [editable(editors.input())]
          }
        },
        {
          header: {
            label: 'C'
          },
          cell: {
            property: 2,
            transforms: [editable(editors.input())]
          }
        },
        {
          header: {
            label: 'D'
          },
          cell: {
            property: 3,
            transforms: [editable(editors.input())]
          }
        }
      ],
      data: [
        ['123', '234', '11', '44'],
        ['11', '1', '5', '56'],
        ['3', '4', '50', '88'],
        ['33', '114', '150', '77']
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
