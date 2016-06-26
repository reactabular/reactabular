`Table` is the core of Reactabular. It sets up a [context](https://facebook.github.io/react/docs/context.html) and maps `column` and `data` definitions to its children components.

```react
const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John'
    },
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George'
    },
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
      property: 'dad.name'
    }
  }
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
      property: 'dad.name'
    }
  }
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
      name: 'John'
    },
    lovesBeeGees: true,
    country: 'fi'
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: false,
    country: 'uk'
  }
];
const countries = {
  fi: 'Finland',
  uk: 'United Kingdom'
};

const customizedColumns = [
  {
    header: {
      label: 'Name',

      // Customize formatting (jsx ok)
      format: name => name.toUpperCase()
    },
    cell: {
      property: 'name',

      // Attach custom propTypes
      transform: () => ({
        onClick: () => alert('clicked name')
      })
    }
  },
  {
    header: {
      label: 'Dad'
    },
    cell: {
      // Nested lookup
      property: 'dad.name'
    }
  },
  {
    header: {
      label: 'Country',

      // Attach custom propTypes
      transform: () => ({
        onClick: () => alert('clicked country header')
      })
    },
    cell: {
      property: 'country',

      // Perform custom lookups through resolve
      resolve: country => countries[country]
    }
  },
  {
    header: {
      label: 'Loves BeeGees'
    },
    cell: {
      property: 'lovesBeeGees',

      // Customize formatting
      format: lovesBeeGees => {
        return lovesBeeGees ? 'loves' : 'loves not';
      }
    }
  }
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

**`header.label = <string>`**

`header.label` is the value displayed to the user. In addition search options are populated based on it so this should be a string.

```code
{
  header: {
    label: 'Name'
  }
}
```

**`header.transform = (<label>, { cellData: <label> }) => ({... props ...})`**

The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.

```code
{
  header: {
    label: 'Name',
    transform: sortable('name')
  }
}
```

**`header.format = label => <string|React element>`**

If manipulating `propTypes` isn't enough, you can `format` the output. This should return something React can display. Here we use it to inject an extra checkbox to the header cell.

```code
{
  header: {
    label: 'Name',
    format: name => (
      <div>
        <input
          type="checkbox"
          onClick={() => console.log('clicked')}
          style={{ width: '20px' }}
        />
        <span>{name}</span>
      </div>
    )
  }
}
```

### `cell` Fields

**`cell.property = <string>`**

`cell.property` should map to the property you want to extract from `data` and to show in the cell. This supports nested definitions so you can do `foo.bar.baz` and it will work.

```code
{
  cell: {
    property: 'name'
  }
}
```

**`cell.transform = (<value>, { cellData: <object>, property: <string> }) => ({... props ...})`**

`cell.transform` follows the same idea as `header.transform`. This time `value` is the resolved `property` and we have extra data available.

```code
{
  cell: {
    transform: editable(editors.input())
  }
}
```

**`cell.format = value => <string|React element>`**

The same idea as for `header.format`.

```code
{
  cell: {
    property: 'salary',
    format: salary => (
      <span onDoubleClick={() => alert(`salary is ${salary}`)}>
        {highlight('salary')(salary)}
      </span>
    )
  }
}
```

**`cell.resolve = (value, { cellData: <object>, property: <string> }) => <string>`**

Sometimes you need to manipulate the data fetched from property somehow. For instance you might need to perform a lookup to `resolve` it to some other value. This is the place to do that. Search, etc. will pick this up.

```code
{
  cell: {
    resolve: country => find(countries, 'value', country).name
  }
}
```
