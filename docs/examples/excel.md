The following example implements a light version of Excel through the transform interface.

```jsx
/*
import React from 'react';
import { cloneDeep } from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
*/

class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => (
        rowData[columnIndex - 1].editing
      ),
      onActivate: ({ rowIndex, columnIndex, rowData }) => {
        const rows = cloneDeep(this.state.rows);

        rows[rowIndex][columnIndex - 1].editing = true;

        this.setState({ rows });
      },
      onValue: ({ rowIndex, columnIndex, value }) => {
        const rows = cloneDeep(this.state.rows);

        rows[rowIndex][columnIndex - 1] = {
          value,
          editing: false
        };

        this.setState({ rows });
      },
      getEditedValue: v => v.value
    });
    const evaluate = evaluator(() => convertToValues(this.state.rows));

    this.state = {
      columns: [
        {
          header: {
            label: ''
          },
          cell: {
            formatters: [
              (value, { rowIndex }) => rowIndex + 1
            ]
          }
        },
        {
          property: 0,
          header: {
            label: 'A'
          },
          cell: {
            transforms: [
              editable(edit.input())
            ],
            formatters: [
              evaluate
            ]
          }
        },
        {
          property: 1,
          header: {
            label: 'B'
          },
          cell: {
            transforms: [
              editable(edit.input())
            ],
            formatters: [
              evaluate
            ]
          }
        },
        {
          property: 2,
          header: {
            label: 'C'
          },
          cell: {
            transforms: [
              editable(edit.input())
            ],
            formatters: [
              evaluate
            ]
          }
        },
        {
          property: 3,
          header: {
            label: 'D'
          },
          cell: {
            transforms: [
              editable(edit.input())
            ],
            formatters: [
              evaluate
            ]
          }
        }
      ],
      rows: convertToObjects([
        ['123', '234', '=A1 + B1', '44'],
        ['11', '1', '5', '56'],
        ['3', '4', '=A1', '88'],
        ['33', '114', '150', '77']
      ])
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

function evaluator(getRows, key = 'value') {
  const characters = 'ABCD';

  const resolveInput = (rows, input, level = 0) => {
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
          const reference = resolveReference(rows, c);

          if (reference[0] === '=') {
            return `(${resolveInput(rows, reference.slice(1), level + 1)})`;
          }

          return reference;
        }
      ).
      join(' ');
  };

  const resolveReference = (rows, input) => {
    const x = characters.indexOf(input[0]); // Supports just one character
    const y = parseInt(input[1] - 1, 10); // Supports just one number
    const yRows = rows[y] || [];

    if (x >= 0 && y < yRows.length) {
      return rows[y][x];
    }

    return input;
  };

  return input => {
    if (!input) {
      return;
    }

    const inp = input[key];
    const rows = getRows();


    if (inp[0] === '=') {
      const result = resolveInput(rows, inp);

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
