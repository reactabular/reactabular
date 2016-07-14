The following example implements a light version of Excel through the transform interface.

```jsx
/*
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  transforms, edit, Table
} from 'reactabular';
*/

class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = transforms.edit({
      isEditing: ({ columnIndex, rowData }) => (
        rowData[columnIndex - 1].editing
      ),
      onActivate: ({ rowIndex, columnIndex, rowData }) => {
        const data = cloneDeep(this.state.data);

        data[rowIndex][columnIndex - 1].editing = true;

        this.setState({ data });
      },
      onValue: ({ rowIndex, columnIndex, value }) => {
        const data = cloneDeep(this.state.data);

        data[rowIndex][columnIndex - 1] = {
          value,
          editing: false
        };

        this.setState({ data });
      },
      getEditedValue: v => v.value
    });
    const evaluate = evaluator(() => convertToValues(this.state.data));

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
            transforms: [editable(edit.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'B'
          },
          cell: {
            property: 1,
            transforms: [editable(edit.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'C'
          },
          cell: {
            property: 2,
            transforms: [editable(edit.input())],
            format: evaluate
          }
        },
        {
          header: {
            label: 'D'
          },
          cell: {
            property: 3,
            transforms: [editable(edit.input())],
            format: evaluate
          }
        }
      ],
      data: convertToObjects([
        ['123', '234', '=A1 + B1', '44'],
        ['11', '1', '5', '56'],
        ['3', '4', '=A1', '88'],
        ['33', '114', '150', '77']
      ])
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

function convertToObjects(rows, key = 'value') {
  return rows.map(row =>
    row.map(item => ({
      [key]: item
    }))
  );
}

function convertToValues(rows, key = 'value') {
  return rows.map(row => row.map(d => d[key]));
}

function evaluator(getData, key = 'value') {
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
    const inp = input[key];
    const data = getData();


    if (inp[0] === '=') {
      const result = resolveInput(data, inp);

      if (result) {
        try {
          return <span style={{ fontWeight: 'bold' }}>{eval(result)}</span>; // eslint-disable-line no-eval, max-len
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }

      return <span style={{ color: 'red' }}>!ERR</span>;
    }

    return inp;
  };
}

<ExcelTable />
```
