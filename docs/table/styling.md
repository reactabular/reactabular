Reactabular doesn't force you to style in any particular way. Instead, it provides enough flexibility for you to attach styling hooks to it as you see fit. This can be achieved by both the column and React definitions.

The project root contains a file, **style.css**, which you can import to your project. It sets styles related to sorting. It can be a good idea to use predefined styles like the ones provided by [Pure.css](http://purecss.io/) to save some effort.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header
    className="header"
    onRow={(row, { rowIndex }) => {
      return {
        className: rowIndex % 2 ? 'odd-row' : 'even-row',
      }
    }}
  />

  <Table.Body
    rows={rows}
    rowKey="id"
    onRow={(row, { rowIndex }) => {
      // Important! This gets called only when the row is updated. It is
      // preferable to handle even/odd styling through CSS unless you
      // override default shouldComponentUpdate behavior or use virtualization.
      return {
        className: rowIndex % 2 ? 'odd-row' : 'even-row',
      }
    }
  }
  />
</Table.Provider>
```

If you need even more control, override the default elements as discussed in the next section. You can also override styling on cell level by implementing [transforms](column-definition/transforms) that inject either `className`s or `style`.
