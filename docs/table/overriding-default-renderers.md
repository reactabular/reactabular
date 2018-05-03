If you want to override the default elements, pass a React component through the `renderers` prop. It should render passed props like this:

```react
const listWrapper = ({ children }) => <ul className="list">{children}</ul>;
const listItem = ({ children }) => <li className="list-item">{children}</li>;
const listCell = ({ children }) => <span className="list-cell">{children}</span>;

<Table.Provider columns={columns} renderers={{
  table: listWrapper,
  header: {
    wrapper: listWrapper,
    row: listItem,
    cell: listCell
  },
  body: {
    wrapper: listWrapper,
    row: listItem,
    cell: listCell
  }
}}>
  <Table.Header />
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

The defaults are as follows:

```javascript
const renderer = type => ({
  children, columnIndex, renderer, rowData, rowIndex, props
} = {}) => (
  React.createElement(type, props, children)
);
const tableDefaults = {
  renderers: {
    table: renderer('table'),
    header: {
      wrapper: renderer('thead'),
      row: renderer('tr'),
      cell: renderer('th')
    },
    body: {
      wrapper: renderer('tbody'),
      row: renderer('tr'),
      cell: renderer('td')
    }
  }
};
```

## See Also

* [Fixed Width Columns](/examples/fixed-width-columns)
