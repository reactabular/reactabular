`Table` is the core of Reactabular. It sets up a [context](https://facebook.github.io/react/docs/context.html) and maps `column` and `data` definitions to its children components.

```react
const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John',
    },
    lovesBeeGees: true,
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George',
    },
    lovesBeeGees: false,
  },
];

const columns = [
  {
    header: {
      value: 'Name',
    },
    cell: {
      property: 'name',
    },
  },
  {
    header: {
      value: 'Dad',
    },
    cell: {
      property: 'dad.name',
    },
  },
];

<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
>
  <Table.Header />

  <Table.Body rowKey="id" />
</Table>
```

## Accessing Nested `Table` Data

`Table` allows you to access nested data through a dot notation.

```react
const nestedColumns = [
  {
    header: {
      value: 'Name',
    },
    cell: {
      property: 'name',
    },
  },
  {
    header: {
      value: 'Dad',
    },
    cell: {
      property: 'dad.name',
    },
  },
];

<Table
  className="pure-table pure-table-striped"
  columns={nestedColumns}
  data={data}
>
  <Table.Header />

  <Table.Body rowKey="id" />
</Table>
```

## Customizing `Table` Cells

`Table` cell rendering can be customized through the column definition. It accepts handlers that can be used to customize the behavior.

```react
const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John',
    },
    lovesBeeGees: true,
    country: 'fi',
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George',
    },
    lovesBeeGees: false,
    country: 'uk',
  },
];
const countries = {
  fi: 'Finland',
  uk: 'United Kingdom',
};

const customizedColumns = [
  {
    header: {
      value: 'Name',

      // Customize formatting (jsx ok)
      format: name => name.toUpperCase(),
    },
    cell: {
      property: 'name',

      // Attach custom propTypes
      transform: () => ({
        onClick: () => alert('clicked name'),
      })
    },
  },
  {
    header: {
      value: 'Dad',
    },
    cell: {
      // Nested lookup
      property: 'dad.name',
    },
  },
  {
    header: {
      value: 'Country',

      // Attach custom propTypes
      transform: () => ({
        onClick: () => alert('clicked country header'),
      })
    },
    cell: {
      property: 'country',

      // Perform custom lookups through resolve
      resolve: country => countries[country],
    },
  },
  {
    header: {
      value: 'Loves BeeGees',
    },
    cell: {
      property: 'lovesBeeGees',

      // Customize formatting
      format: lovesBeeGees => {
        return lovesBeeGees ? 'loves' : 'loves not';
      },
    },
  },
];

<Table
  className="pure-table pure-table-striped"
  columns={customizedColumns}
  data={data}
>
  <Table.Header />

  <Table.Body rowKey="id" />
</Table>
```

### `header` Fields

* `header.value` - This maps to the value displayed to the user. In addition search options are populated based on it so this should be a string.
* `header.transform` - The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.
* `header.format` - If manipulating `propTypes` isn't enough, you can `format` the output. This should return something React can display. Here we use it to inject an extra checkbox to the header cell.

### `cell` Fields

* `cell.property` - This should map to the property you want to extract from `data` and to show in the cell. This supports nested definitions so you can do `foo.bar.baz` and it will work.
* `cell.transform` - Same idea as for `header.transform`.
* `cell.format` - Same idea as for `header.format`.
* `cell.resolve` - Sometimes you need to manipulate the data fetched from property somehow. For instance you might need to perform a lookup to `resolve` it to some other value. This is the place to do that. Search, etc. will pick this up.

## Customizing a `Table` Footer

It is possible to inject a custom footer like this:

```react
<Table
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
>
  <Table.Header />

  <Table.Body rowKey="id" />

  <tfoot>
    <tr>
      <td>Show custom data here</td>
      <td>Show custom data here</td>
    </tr>
  </tfoot>
</Table>
```
