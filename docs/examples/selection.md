You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

```jsx
/*
import React from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {
  Table
} from 'reactabular';
*/

class SelectionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        {
          id: 100,
          name: 'Adam',
          age: 55
        },
        {
          id: 102,
          name: 'Joe',
          age: 12
        },
        {
          id: 101,
          name: 'Brian',
          age: 62
        },
        {
          id: 103,
          name: 'Mike',
          age: 22
        },
        {
          id: 104,
          name: 'Jack',
          age: 33
        }
      ],
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age'
          }
        }
      ],
      selectedRow: {}
    };

    this.onRow = this.onRow.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPressed);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPressed);
  }
  render() {
    const { columns, rows, selectedRow } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body
            rows={rows}
            rowKey="id"
            onRow={this.onRow}
          />

          <tfoot>
            <tr>
              <td>Selected: {selectedRow.name}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table.Provider>
      </div>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: classnames(
        rowIndex % 2 ? 'odd-row' : 'even-row',
        row.selected && 'selected-row'
      ),
      onClick: () => this.selectRow(row.id)
    };
  }
  onKeyPressed(e) {
    const { rows, selectedRow } = this.state;
    const idx = findIndex(rows, { id: selectedRow.id });

    // No selection yet, escape
    if (idx < 0) {
      return;
    }

    // Arrow Up
    if (e.keyCode === 38 && idx > 0) {
      e.preventDefault();

      this.selectRow(rows[idx - 1].id);
    }

    // Arrow Down
    if (e.keyCode === 40 && idx < rows.length - 1) {
      e.preventDefault();

      this.selectRow(rows[idx + 1].id);
    }
  }
  selectRow(selectedRowId) {
    let selectedRow;

    // Reset selected flags and select the given row
    const rows = cloneDeep(this.state.rows).map(row => {
      row.selected = false;

      if (row.id === selectedRowId) {
        row.selected = true;

        selectedRow = row;
      }

      return row;
    });

    this.setState({ rows, selectedRow });
  }
}

<SelectionTable />
```
