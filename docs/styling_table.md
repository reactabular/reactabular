# Styling a Table

The following example illustrates how to attach classes to various parts of a table:

```jsx

// Cell styling. Other options too. See "customizing cells"
const columns = [
  {
    property: 'name',
    header: <span className="name-header">Name</span>
    cell: ({ value }) => <span className="demo-cell">{value}</span>
  }
];

...

<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
>
  <Table.Header className="header" />

  <Table.Body
    className="table-body"
    rowKey="id"
    row={(row, rowIndex) => ({
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    })}
  />
</Table>
```
