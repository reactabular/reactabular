`reactabular-select` provides a selection helper that makes it easier to track up/down arrows using React. Actual search logic is implemented by [selectabular](https://www.npmjs.com/package/selectabular) and you'll need to install it separately to your project. The same goes for `reactabular-select`.

## API

`reactabular-select` API consists of two functions: `select.byArrowKeys` and `select.row`.

### `select.byArrowKeys({ rows: <rows>, selectedRowIndex: <number>, onSelectRow: (selectedRowIndex) => <any>})(<React element>)`

`select.byArrowKeys` is a React level helper that tracks up/down arrows. If there a selection (`selectedRowIndex`), then it triggers `onSelectRow` with the new `selectedRowIndex` which you can then use to update your selection state.

## How to Use?

The following example illustrates how to use `reactabular-select` and `selectabular` with a table. You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

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
import { byArrowKeys } from 'reactabular-select';
import { compose } from 'redux';
import select from 'selectabular';
*/

const rows = [
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
];

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    header: {
      label: 'Age'
    }
  }
];

class SelectionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns,
      selectedRows: []
    };

    this.onRow = this.onRow.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.getSelectedRowIndex = this.getSelectedRowIndex.bind(this);
  }
  render() {
    const { columns, rows, selectedRows } = this.state;
    const selectedRowIndex = this.getSelectedRowIndex(selectedRows);

    return byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.onSelectRow
    })(
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
              <td>Selected: {selectedRows[0] && selectedRows[0].name}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table.Provider>
      </div>
    );
  }
  onRow(row, { rowIndex }) {
    return {
      className: classnames(
        rowIndex % 2 ? 'odd-row' : 'even-row',
        row.selected && 'selected-row'
      ),
      onClick: () => this.onSelectRow(rowIndex)
    };
  }
  onSelectRow(selectedRowIndex) {
    const { rows } = this.state;
    const selectedRowId = rows[selectedRowIndex].id;

    this.setState(
      compose(
        select.rows(row => row.id === selectedRowId),
        select.none
      )(rows)
    );
  }
  getSelectedRowIndex(selectedRows) {
    return findIndex(this.state.rows, {
      id: selectedRows[0] && selectedRows[0].id
    });
  }
}

<SelectionTable />
```
