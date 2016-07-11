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

## See Also

* [Selection](/examples/selection)
