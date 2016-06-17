# Customizing Rows

Sometimes you might want to apply some special props or logic per table row. This can be achieved easily through `row` prop like this:

```jsx
<Table columns={columns} data={paginated.data}>
  <Table.Header>
    <ColumnFilters columns={columns} onChange={this.onSearch} />
  </Table.Header>

  <Table.Body
    rowKey="id"
    row={(row, rowIndex) => ({
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', row),
    })}
  />
</Table>
```
