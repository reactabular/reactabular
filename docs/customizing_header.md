# Customizing Header

Sometimes you might want to define a custom header (`thead`) for your table. This can be achieved through the `columnNames` prop like this:

```jsx
<Table columns={columns} header={header} data={paginated.data} columnNames={<thead>demo</thead>} />
```

You can also use a function to customize further:

```jsx
columnFilters(columns) {
  var headerConfig = this.state.header;

  // Render column names and filters
  return (
    <thead>
      <ColumnNames config={headerConfig} columns={columns} />
      <ColumnFilters columns={columns} onChange={this.onSearch} />
    </thead>
  );
},

...

<Table ... columnNames={this.columnFilters} />
```
