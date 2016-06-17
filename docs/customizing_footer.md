# Customizing the Footer

Adding a custom footer is simple. Just write the definition inside `Table` itself. In this particular case it's not very useful but you could easily generate things like sums and such here.

```jsx
# Customizing the Header

Sometimes you might want to customize the table header. You can achieve it like this:

```jsx
<Table columns={columns} data={paginated.data}>
  <Table.Header />

  <Table.Body rowKey="id" />

  <tfoot>
    <tr>
      Inject custom data here
    </tr>
  </tfoot>
</Table>
```
