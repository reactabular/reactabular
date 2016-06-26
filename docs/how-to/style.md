Reactabular doesn't force you to style in any particular way. Instead, it provides enough flexibility for you to attach styling hooks to it as you see fit.

The project root contains a file, **style.css**, which you can import to your project. It sets styles related to sorting. It can be a good idea to use predefined styles like the ones provided by [Pure.css](http://purecss.io/) to save some effort.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header className="header" />

  <Table.Body
    row={(row, rowIndex) => ({
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
    })}
  />
</Table>
```
