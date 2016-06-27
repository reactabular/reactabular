`Table.Body` renders a table data within a `Table` context.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />

  <Table.Header />

  <Table.Body />
</Table>
```

## Customizing `Table.Body` Rows

It is possible to customize body behavior on a row level. `row` prop accepts function <`(row, rowIndex) => ({...})` that allows you to set custom attributes per each row.

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body
    row={(row, rowIndex) => ({
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', row),
    })}
  />
</Table>
```

## Customizing `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />

  <tfoot>
    <tr>
      <td>Show custom data here</td>
      <td>Show custom data here</td>
    </tr>
  </tfoot>
</Table>
```

## Styling

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
