Reactabular provides three components: `Table.Provider`, `Table.Header`, and `Table.Body`. `Table.Provider` sets the data context. It may contain multiple `Table.Header` and `Table.Body` elements. You can control data per body while the provider maintains a shared column definition.

## `Table.Provider`

`Table.Provider` is the core of Reactabular. It sets up a [context](https://facebook.github.io/react/docs/context.html) and maps the `column` definition to its children components. The following example illustrates the basic idea.

```jsx
/*
import { Table } from 'reactabular';
*/

const rows = [
  {
    id: 100,
    name: 'Adam',
    dad: 'John',
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: 'George',
    lovesBeeGees: false
  },
];

const columns = [
  {
    header: {
      label: 'Name'
    },
    cell: {
      property: 'name'
    }
  },
  {
    header: {
      label: 'Dad'
    },
    cell: {
      property: 'dad'
    }
  }
];

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

## `Table.Header`

`Table.Header` renders a table header within a `Table.Provider` context.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id"/>

  <Table.Header />
</Table.Provider>
```

## Customizing `Table.Header`

It is possible to customize a header by passing child components to it. This way you can implement filtering per column for instance.

Here `ColumnFilters` injects an additional row for the filter controls. An alternative way to handle it would be to push the problem to the column definition.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header>
    <ColumnFilters
      columns={columns}
      onChange={value => console.log('new value', value)}
    />
  </Table.Header>

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

> `ColumnFilters` isn't included in the standard distribution. You can [find it at the project repository](https://github.com/reactabular/reactabular/blob/master/docs/helpers/ColumnFilters.jsx).

## `Table.Body`

`Table.Body` renders table `rows` within a `Table.Provider` context. It accepts either an array of objects or an array of arrays (see the [Excel example](/examples/excel)). In the former case you should define a `rowKey`. This allows React to render in a more performant way.

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />

  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

## Customizing `Table.Body` Rows

It is possible to customize body behavior on a row level. `onRow` prop accepts function `(row, rowIndex) => ({...})` that allows you to set custom attributes per each row.

```react
class CustomTable extends React.Component {
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
      >
        <Table.Header />

        <Table.Body
          rows={rows}
          rowKey="id"
          onRow={this.onRow}
        />
      </Table.Provider>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', row),
    };
  }
}

<CustomTable />
```

It's a good idea to define a possible `row` handler separately to avoid binding per each `render`. If you write the handler inline, it will bind each time `render()` is called and reduce performance slightly.

## Customizing `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />

  <tfoot>
    <tr>
      <td>Show custom rows here</td>
      <td>Show custom rows here</td>
    </tr>
  </tfoot>
</Table.Provider>
```

## See Also

* [Selection](http://reactabular.js.org/#/examples/selection)
