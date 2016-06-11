# Styling a Table

The following example illustrates how to attach classes to various parts of a table:

```jsx

// Cell styling. Other options too. See "customizing cells"
columns: [
  {
    property: 'name',
    cell: (v) => ({
      className: 'demo-cell',
      value: <span>{v}</span>
    })
  },
]

...

<Table
  className="table"
  columns={columns}
  data={paginated.data}
  columnNames={
    <thead>
      <ColumnNames config={{className: 'table-header'}} columns={columns} />
    </thead>
  }
  row={(d, rowIndex) => {
      return {
        className: rowIndex % 2 ? 'odd-row' : 'even-row'
      };
  }} />
```
