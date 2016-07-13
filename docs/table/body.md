`Table.Body` renders a table data within a `Table.Provider` context.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={resolve({ columns })(data)}
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
class CustomTable extends React.Component {
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        data={resolve({ columns })(data)}
        rowKey="id"
      >
        <Table.Header />

        <Table.Body
          row={this.onRow}
        />
      </Table.Provider>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', row),
    };
  }
}

<CustomTable />
```

For the performance optimizations to work, it is important you **don't** inline possible `row` handler within the table definition. If you do, then `Table.Body` won't be able to detect data changes correctly through its `shouldComponentUpdate` check.

## Customizing `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={resolve({ columns })(data)}
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

## See Also

* [Selection](/examples/selection)
