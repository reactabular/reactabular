`Table.Header` renders a table header within a `Table.Provider` context.

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
</Table.Provider>
```

## Customizing `Table.Header`

It is possible to customize a header by passing child components to it. This way you can implement filtering per column for instance.

Here `ColumnFilters` injects an additional row for the filter controls. An alternative way to handle it would be to push the problem to the column definition.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header>
    <ColumnFilters
      columns={columns}
      onChange={value => console.log('new value', value)}
    />
  </Table.Header>

  <Table.Body />
</Table.Provider>
```

## Overriding Default Elements

Just like with `Table.Provider` and `table`, it's possible to override the default elements. `Table.Header` follows the following configuration scheme:

```code
lang: js
---
const components = {
  header: {
    wrapper: 'thead',
    row: 'tr',
    cell: 'th'
  }
};
```
