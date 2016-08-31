`reactabular-select` provides a selection helper that makes it easier to handle row selection. You still need to update your state after selection.

## API

`reactabular-select` API consists of two functions: `select.byArrowKeys` and `select.row`.

### `select.byArrowKeys({ rows: <rows>, selectedRowIndex: <number>, onSelectRow: (selectedRowIndex) => <any>})(<React element>)`

`select.byArrowKeys` is a React level helper that tracks up/down arrows. If there a selection (`selectedRowIndex`), then it triggers `onSelectRow` with the new `selectedRowIndex` which you can then use to update your selection state.

### `select.row({ rows: <rows>, isSelected: (row, selectedRowId) => <boolean>, selectedRowId: <any>}) => { rows: <rows>, selectedRow: <object> }`

`select.row` is a helper that resets the selection state of the given `rows` based on `isSelected` check and `selectedRowId` and sets the matching row as selected. The `isSelected` check defaults to a check by `id`, but you can override it with something more custom.

It is important to note that Reactabular expects you to maintain `editing` state within your row data. This is necessary for it to detect which rows to update as you toggle editing.

**Example:**

```jsx
/*
import {
  select
} from 'reactabular';
*/

const rows = [
  {
    id: 123,
    name: 'Joe'
  },
  {
    id: 321,
    name: 'Adam'
  }
];

const result = select.row({
  rows,
  selectedRowId: 123
});

<div>
  <div>Rows: {JSON.stringify(result.rows, null, 2)}</div>
  <div>Selected row: {JSON.stringify(result.selectedRow, null, 2)}</div>
</div>
```

## How to Use?

The following example illustrates how to use the selection helpers with a table. You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

```jsx
/*
import React from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {
  select, Table
} from 'reactabular';
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
      selectedRow: {}
    };

    this.onRow = this.onRow.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.getSelectedRowIndex = this.getSelectedRowIndex.bind(this);
  }
  render() {
    const { columns, rows, selectedRow } = this.state;
    const selectedRowIndex = this.getSelectedRowIndex(selectedRow);

    return select.byArrowKeys({
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
              <td>Selected: {selectedRow.name}</td>
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

    this.setState(
      select.row({
        rows,
        selectedRowId: rows[selectedRowIndex].id
      })
    );
  }
  getSelectedRowIndex(selectedRow) {
    return findIndex(this.state.rows, {
      id: selectedRow.id
    });
  }
}

<SelectionTable />
```
