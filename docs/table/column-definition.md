The column definition is an array of objects. Each maps to a specific table column and describes what data it should display and how. It also manages headers. A minimal structure looks defining a column with header "Name" and fetching data using the `name` property looks like this:

```code
lang: js
---
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

## `props`

Root level `props` allows you to attach props to all header and content cells. The `props` injected by more specific configuration can override these:

**Example:**

```code
lang: js
---
{
  props: {
    style: {
      width: 100
    }
  },
  ...
}
```

## `header` Fields

The `header` portion supports `label`, `transforms` and `format` fields.

### **`header.label = <string>`**

`label` is the most essential as it describes the value displayer to the user. This should be a string. For example search options are populated based on this.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name'
  }
}
```

Given you might want to attach custom functionality to a header, say sorting on click, it is possible to attach specific *transforms* to the header cell. The same idea works for table cells.

### **`header.transforms`**

```code
lang: js
---
header.transforms = [
  (<label>, {
    columnIndex: <number>,
    column: <object>
  }
) => ({... props ...})]
```

A transform is expected to return an object containing props. We can for instance inject `onClick` handler and perform sorting based on that. If a transform returns `children`, it will override rendering behavior making it possible to implement editors.

The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name',
    transforms: [sortable('name')]
  }
}
```

To give you a concrete example of overriding, consider the example below:

```code
lang: js
---
{
  header: {
    label: 'Name',
    transforms: [
      () => ({
        children: <span>override to show instead of value</span>
      })
    ]
  }
}
```

### **`header.format = label => <string|React element>`**

If manipulating `propTypes` isn't enough, you can `format` the output. This should return something React can display. The result will be displayed **within** a table cell.

In the following example we use it to inject an extra checkbox to the header cell.

**Example:**

```code
lang: js
---
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

### **`header.props = <object>`**

You can set header specific props through `props`.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name',
    props: {
      style: {
        width: 100
      }
    }
  }
}
```

## `cell` Fields

In addition to `header` customization, it's essential to define how the data should map to content. This is achieved through `cell` fields.

### **`cell.property = <string>`**

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

### **`cell.transforms`**

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

### **`cell.format = value => <string|React element>`**

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

### **`cell.resolve`**

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

### **`cell.props = <object>`**

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

## `children`

Given sometimes you might want to display data in a nested manner, there's a `children` field for that. It accepts an array of column definitions and is recursive. If `children` has been set, then `cell` specific sibling field won't do anything. `header` will still work as usual.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name'
  },
  children: [
    {
      header: {
        label: 'First Name'
      },
      cell: {
        property: 'name.first'
      }
    },
    {
      header: {
        label: 'Last Name'
      },
      cell: {
        property: 'name.last'
      }
    },
    {
      header: {
        label: 'Company'
      },
      cell: {
        property: 'company'
      }
    },
  ]
}
```
