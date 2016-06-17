# Customizing the Header

Sometimes you might want to customize the table header. You can achieve it like this:

```jsx
<Table columns={columns} data={paginated.data}>
  <Table.Header>
    {/* Render custom rows here within the table header */}
    <ColumnFilters columns={columns} onChange={this.onSearch} />
  </Table.Header>

  <Table.Body rowKey="id" />
</Table>
```
