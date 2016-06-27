The column definition is an array of objects. Each maps to a specific table column and describes what data it should display and how. It also manages headers. A minimal structure looks defining a column with header "Name" and fetching data using the `name` property looks like this:

```code
const columns = [
  {
    header: {
      label: 'Name'
    },
    cell: {
      property: 'name'
    }
  }
];
```

## `header` Fields

The `header` portion supports `label`, `transform` and `format` fields.

**`header.label = <string>`**

`label` is the most essential as it describes the value displayer to the user. This should be a string. For example search options are populated based on this.

**Example:**

```code
{
  header: {
    label: 'Name'
  }
}
```

Given you might want to attach custom functionality to a header, say sorting on click, it is possible to attach specific *transforms* to the header cell. The same idea works for table cells.

**`header.transform = (<label>, { cellData: <label> }) => ({... props ...})`**

A transform is expected to return an object containing props. We can for instance inject `onClick` handler and perform sorting based on that. If a transform returns `children`, it will override rendering behavior making it possible to implement editors.

The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.

**Example:**

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

**Example:**

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

## `cell` Fields

In addition to `header` customization, it's essential to define how the data should map to content. This is achieved through `cell` fields.

**`cell.property = <string>`**

You should define `cell.property` at minimum. It maps a field from `data` into something you can display to the user. This supports nested definitions so you can do `foo.bar.baz` in addition to simple `foo` type definitions.

**Example:**

```code
{
  cell: {
    property: 'name'
  }
}
```

**`cell.transform = (<value>, { cellData: <object>, property: <string> }) => ({... props ...})`**

`cell.transform` follows the same idea as `header.transform`. This time `value` is the resolved `property` and we have extra data available.

**Example:**

```code
{
  cell: {
    transform: editable(editors.input())
  }
}
```

**`cell.format = value => <string|React element>`**

The idea here is the same as for `header.format`.

**Example:**

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

Sometimes you need to manipulate the data fetched from property somehow. For instance you might need to perform a lookup to `resolve` it to some other value. This is the place to do that. Other functionality will pick this up.

**Example:**

```code
{
  cell: {
    resolve: country => countries[country]
  }
}
```
