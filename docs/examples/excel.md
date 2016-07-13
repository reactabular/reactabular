The following example implements a light version of Excel through the transform interface.

```jsx
/*
import React from 'react';
import {
  transforms, editors, Table
} from 'reactabular';
*/

// XXXXX: broken as edit needs more thought
class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    this.editedCells = {};

    const editable = transforms.edit({
      isEditing: ({ rowIndex, columnIndex }) => (
        this.editedCells[`${rowIndex}-${columnIndex}`]
      ),
      onActivate: ({ rowIndex, columnIndex }) => {
        this.editedCells[`${rowIndex}-${columnIndex}`] = true;

        // XXXXX: figure out a good way to force render (Table.Body!)
        // stash editedCells to component state and pass that to
        // Table.Body for invalidation?
      },
      onValue: ({ value, columnIndex, rowIndex }) => {
        this.editedCells[`${rowIndex}-${columnIndex}`] = false;

        this.state.data[rowIndex][columnIndex - 1] = value;

        this.setState({
          editedCell: null,
          data: this.state.data
        });
      }
    });
    const evaluate = evaluator(() => this.state.data);

    this.state = {
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

<ExcelTable />
```
