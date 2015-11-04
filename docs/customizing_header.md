# Customizing Header

Sometimes you might want to define a custom header (`thead`) for your table. This can be achieved through the `columnNames` prop like this:

```jsx
<Table columns={columns} header={header} data={paginated.data} columnNames={<thead>demo</thead>} />
```
