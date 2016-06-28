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
      <Table columns={columns} data={data} rowKey="id">
        <Table.Header />

        <Table.Body />
      </Table>
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

    if (x >= 0 && y < data[y].length) {
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
          return <span style={{ fontWeight: 'bold' }}>{eval(result)}</span>; // eslint-disable-line no-eval, max-len
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }

      return <span style={{ color: 'red' }}>!ERR</span>;
    }

    return input;
  };
}
