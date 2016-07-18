You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

```jsx
/*
import React from 'react';
import classnames from 'classnames';
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
      selectedRowId: null
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPressed);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPressed);
  }
  render() {
    const { columns, rows, selectedRowId } = this.state;
    const selectedRow = find(rows, { id: selectedRowId }) || {};

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
            row={(row, rowIndex) => ({
              className: classnames(
                rowIndex % 2 ? 'odd-row' : 'even-row',
                row.id === selectedRowId && 'selected-row'
              ),
              onClick: () => this.onRowSelected(row)
            })}
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
  onRowSelected(row) {
    this.setState({ selectedRowId: row.id });
  }
  onKeyPressed(e) {
    const { rows, selectedRowId } = this.state;
    const idx = findIndex(rows, { id: selectedRowId });

    // No selection yet, escape
    if (idx < 0) {
      return;
    }

    // Arrow Up
    if (e.keyCode === 38 && idx > 0) {
      e.preventDefault();

      this.setState({
        selectedRowId: rows[idx - 1].id
      });
    }

    // Arrow Down
    if (e.keyCode === 40 && idx < rows.length - 1) {
      e.preventDefault();

      this.setState({
        selectedRowId: rows[idx + 1].id
      });
    }
  }
}

<SelectionTable />
```
