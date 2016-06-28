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
        ['123', '234', '11', '44'],
        ['11', '1', '5', '56'],
        ['3', '4', '=A1', '88'],
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

function evaluator(getData) {
  const characters = 'ABCD';

  return input => {
    const data = getData();

    if (input[0] === '=') {
      const x = characters.indexOf(input[1]); // Supports just one character
      const y = parseInt(input[2] - 1, 10); // Supports just one number

      if (x >= 0 && y < data[x].length) {
        return <span style={{ fontWeight: 'bold' }}>{data[x][y]}</span>;
      }

      return <span style={{ color: 'red' }}>!ERR</span>;
    }

    return input;
  };
}
