In addition to `header` customization, it's essential to define how the data should map to content. This is achieved through `cell` fields.

## **`cell.property = <string>`**

You should define `cell.property` at minimum. It maps a field from `data` into something you can display to the user.

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

If you want nested definitions (i.e., `foo.bar.baz`), then you should `resolve` your data before passing it to the table.

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
    transforms: [editable(edit.input())]
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
    format: (salary, extra) => (
      <span onDoubleClick={() => alert(`salary is ${salary}`)}>
        {highlight.cell(salary, extra)}
      </span>
    )
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
