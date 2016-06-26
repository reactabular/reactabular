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
