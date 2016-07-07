`Table.Body` renders a table data within a `Table.Provider` context.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />

  <Table.Header />

  <Table.Body />
</Table.Provider>
```

## Customizing `Table.Body` Rows

It is possible to customize body behavior on a row level. `row` prop accepts function `(row, rowIndex) => ({...})` that allows you to set custom attributes per each row.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body
    row={(row, rowIndex) => ({
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', row),
    })}
  />
</Table.Provider>
```

## Customizing `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />

  <tfoot>
    <tr>
      <td>Show custom data here</td>
      <td>Show custom data here</td>
    </tr>
  </tfoot>
</Table.Provider>
```

## Selection Example

You can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.

```react
<SelectionTable />
```

```code
lang: jsx
---
import React from 'react';
import classnames from 'classnames';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {
  Table
} from 'reactabular';

export default class SelectionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
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
    const { columns, data, selectedRowId } = this.state;
    const selectedRow = find(data, { id: selectedRowId }) || {};

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          data={data}
          rowKey="id"
        >
          <Table.Header />

          <Table.Body
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
    const { data, selectedRowId } = this.state;
    const idx = findIndex(data, { id: selectedRowId });

    // No selection yet, escape
    if (idx < 0) {
      return;
    }

    // Arrow Up
    if (e.keyCode === 38 && idx > 0) {
      e.preventDefault();

      this.setState({
        selectedRowId: data[idx - 1].id
      });
    }

    // Arrow Down
    if (e.keyCode === 40 && idx < data.length - 1) {
      e.preventDefault();

      this.setState({
        selectedRowId: data[idx + 1].id
      });
    }
  }
}
```
