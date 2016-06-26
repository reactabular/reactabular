`Table.Body` renders a table data within a `Table` context.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />

  <Table.Header />

  <Table.Body />
</Table>
```

## Customizing `Table.Body` Rows

It is possible to customize body behavior on a row level. `row` prop accepts function <`(row, rowIndex) => ({...})` that allows you to set custom attributes per each row.

```react
<Table
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
</Table>
```
