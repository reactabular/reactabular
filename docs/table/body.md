`Table.Body` renders table `rows` within a `Table.Provider` context. It accepts either an array of objects or an array of arrays (see the [Excel example](/examples/excel)). In the former case you should define a `rowKey`. This allows React to render in a more performant way.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />

  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

## Customizing `Table.Body` Rows

It is possible to customize body behavior on a row level. `onRow` prop accepts function `(row, rowIndex) => ({...})` that allows you to set custom attributes per each row.

```react
class CustomTable extends React.Component {
  render() {
    return (
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

It's a good idea to define a possible `row` handler separately to avoid binding per each `render`. If you write the handler inline, it will bind each time `render()` is called and reduce performance slightly.

## Customizing `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />

  <tfoot>
    <tr>
      <td>Show custom rows here</td>
      <td>Show custom rows here</td>
    </tr>
  </tfoot>
</Table.Provider>
```

## See Also

* [Selection](/examples/selection)
