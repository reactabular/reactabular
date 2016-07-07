In addition to `header` customization, it's essential to define how the data should map to content. This is achieved through `cell` fields.

## **`cell.property = <string>`**

You should define `cell.property` at minimum. It maps a field from `data` into something you can display to the user. This supports nested definitions so you can do `foo.bar.baz` in addition to simple `foo` type definitions.

**Example:**

```code
lang: js
---
{
  cell: {
    property: 'name'
  }
}
```

## **`cell.transforms`**

```code
lang: js
---
cell.transforms = [
  (
    <value>, {
      columnIndex: <number>,
      column: <object>,
      rowData: <object>,
      rowIndex: <number>,
      property: <string>
    }
  ) => ({... props ...})
]
```

`cell.transforms` follows the same idea as `header.transforms`. This time `value` is the resolved `property` and we have extra data available.

**Example:**

```code
lang: js
---
{
  cell: {
    transforms: [editable(editors.input())]
  }
}
```

## **`cell.format = value => <string|React element>`**

The idea here is the same as for `header.format`.

**Example:**

```code
lang: js
---
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

## **`cell.resolve`**

```code
lang: js
---
cell.resolve = (
  value, {
    columnIndex: <number>,
    column: <object>,
    rowData: <object>,
    rowIndex: <number>,
    property: <string>
  }
) => <string>
```

Sometimes you need to manipulate the data fetched from property somehow. For instance you might need to perform a lookup to `resolve` it to some other value. This is the place to do that. Other functionality will pick this up.

**Example:**

```code
lang: js
---
{
  cell: {
    resolve: country => countries[country]
  }
}
```

## **`cell.props = <object>`**

You can set cell specific props through `props`.

**Example:**

```code
lang: js
---
{
  cell: {
    props: {
      style: {
        width: 100
      }
    }
  }
}
```
