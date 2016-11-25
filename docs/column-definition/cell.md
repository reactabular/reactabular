In addition to `header` customization, it's essential to define how the rows should map to content. This is achieved through `cell` fields.

## **`cell.transforms`**

```javascript
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

`cell.transforms` follows the same idea as `header.transforms`. This time `value` is the resolved `property` and we have extra rows available.

**Example:**

```javascript
{
  cell: {
    transforms: [editable(edit.input())]
  }
}
```

## **`cell.formatters = [value => <string|React element>]`**

The idea here is the same as for `header.formatters`.

**Example:**

```javascript
{
  cell: {
    property: 'salary',
    formatters: [
      (salary, extra) => (
        <span onDoubleClick={() => alert(`salary is ${salary}`)}>
          {search.highlightCell(salary, extra)}
        </span>
      )
    ]
  }
}
```

## **`cell.props = <object>`**

You can set cell specific props through `props`.

**Example:**

```javascript
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
