`@reactabular/table` provides three components: `Table.Provider`, `Table.Header`, and `Table.Body`:

* `Table.Provider` attaches column and renderer definition (optional) to the table.
* `Table.Header` connects to the table and renders each `headerCell` from the column definition.
* `Table.Body` connects to the table and renders each `bodyCell` from the column definition. It also accepts rows to render.

## `Table.Provider`

`Table.Provider` is the core of Reactabular. It sets up a [context](https://reactjs.org/docs/context.html) and maps the `column` definition to its children components. The following example illustrates the basic idea.

```jsx
/*
import * as Table from '@reactabular/table';
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
    property: 'name',
    headerCell: 'Name'
  },
  {
    property: 'dad',
    headerCell: 'Dad'
  }
];

<Table.Provider columns={columns}>
  <Table.Header />
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

## `Table.Header`

`Table.Header` renders a table header within a `Table.Provider` context.

```react
<Table.Provider columns={columns}>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id"/>

  <Table.Header />
</Table.Provider>
```

## Customizing `Table.Header`

It is possible to customize a header by using the renderer interface. This way you can implement filtering per column for instance. Here `search.Columns` injects an additional row for the filter controls:

```jsx
class HeaderWrapper extends React.Component {
  render() {
    return <thead>
      {this.props.children}
      <search.Columns
        key="search-columns"
        query={{}}
        columns={columns}
        onChange={value => console.log('new value', value)}
      />
    </thead>;
  }
}

const renderers = {
  header: {
    wrapper: HeaderWrapper
  }
};

<Table.Provider columns={columns} renderers={renderers}>
  <Table.Header />
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

## `Table.Body`

`Table.Body` renders table `rows` within a `Table.Provider` context. It accepts either an array of objects or an array of arrays (see the [Excel example](/examples/excel)). In the former case you should define a `rowKey`. This allows React to render in a more performant way.

Most often you'll define `rowKey` as a string. An alternative is to define it using a function like this: `rowKey={({ rowData, rowIndex }) => rowData.nested.id}`. This is useful if your key is nested or related to some other data. Another way to avoid this problem is to generate the field using `reactabular-resolve` and then point to that through a string.

**Example:**

```react
<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows.filter(r => r.name === 'Adam')} rowKey="id" />

  <Table.Header />

  <Table.Body rows={rows.filter(r => r.name === 'Brian')} rowKey="id" />
</Table.Provider>
```

## Getting Refs

Sometimes you might need to access the underlying DOM nodes for measuring etc. This can be achieved as follows:

```react
// XXXXX: Debug ref handling here
class RefTable extends React.Component {
  constructor(props) {
    super(props);

    class BodyWrapper extends React.Component {
      render() {
        return <tbody onClick={() => console.log(this.headerRef, this.bodyRef)}>{this.props.children}</tbody>;
      }
    }

    this.renderers = {
      body: {
        wrapper: BodyWrapper
      }
    };

    this.headerRef = null;
    this.bodyRef = null;
  }
  render() {
    return (
      <Table.Provider columns={columns} renderers={this.renderers}>
        <Table.Header
          ref={header => {
            this.headerRef = header
          }}
        />
        <Table.Body
          ref={body => {
            this.bodyRef = body
          }}
          rows={rows}
          rowKey="id"
        />
      </Table.Provider>
    );
  }
}

<RefTable />
```

## Customizing `Table.Header` and `Table.Body` Rows

It is possible to customize body behavior on a row level using `renderers`.

```react
class CustomTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderers = {
      header: {
        row: ({ children, renderer, rowIndex }) => React.createElement(
          renderer,
          {
            onClick: () => console.log('clicked header row', rowIndex)
          },
          children
        )
      },
      body: {
        row: ({ children, renderer, rowIndex }) => React.createElement(
          renderer,
          {
            onClick: () => console.log('clicked body row', rowIndex)
          },
          children
        )
      }
    };
  }
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        renderers={this.renderers}
      >
        <Table.Header />

        <Table.Body
          rows={rows}
          rowKey="id"
        />
      </Table.Provider>
    );
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
