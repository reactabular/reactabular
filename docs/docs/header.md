`Table.Header` renders a table header within a `Table` context.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
>
  <Table.Header />

  <Table.Body rowKey="id" />

  <Table.Header />
</Table>
```

## Customizing `Table.Header`

It is possible to customize a header by passing child components to it. This way you can implement filtering per column for instance.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
>
  <Table.Header>
    <ColumnFilters
      columns={columns}
      onChange={value => console.log('new value', value)}
    />
  </Table.Header>

  <Table.Body rowKey="id" />
</Table>
```
