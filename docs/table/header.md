`Table.Header` renders a table header within a `Table.Provider` context.

```react
const { Table } = reactabular;

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id"/>

  <Table.Header />
</Table.Provider>
```

## Customizing `Table.Header`

It is possible to customize a header by passing child components to it. This way you can implement filtering per column for instance.

Here `ColumnFilters` injects an additional row for the filter controls. An alternative way to handle it would be to push the problem to the column definition.

```react
const { Table } = reactabular;

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header>
    <ColumnFilters
      columns={columns}
      onChange={value => console.log('new value', value)}
    />
  </Table.Header>

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

> `ColumnFilters` isn't included in the standard distribution. You can [find it at the project repository](https://github.com/reactabular/reactabular/blob/master/docs/helpers/ColumnFilters.jsx).
