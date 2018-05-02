Reactabular doesn't force you to style in any particular way. Instead, it provides enough flexibility for you to attach styling hooks to it as you see fit. This can be achieved by both the column definition, renderers and the React API.

The project root contains a file, **style.css**, which you can import to your project. It sets styles related to sorting. It can be a good idea to use predefined styles like the ones provided by [Pure.css](http://purecss.io/) to save some effort.

```react
// Important! This gets called only when the row is updated. It is
// preferable to handle even/odd styling through CSS unless you
// override default shouldComponentUpdate behavior or use virtualization.
const evenOdd = ({ children, renderer, rowIndex }) => React.createElement(renderer, {
  className: rowIndex % 2 ? 'odd-row' : 'even-row'
}, children);

const renderers = {
  header: {
    row: evenOdd
  },
  body: {
    row: evenOdd
  }
};

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  renderers={renderers}
>
  <Table.Header className="header" />
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```
