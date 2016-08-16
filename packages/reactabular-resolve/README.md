Sometimes your rows might come in a nested format or it might have a representation that maps to the underlying value. A name split to first and last parts is an example of the former. Country code to country mapping is an example of the latter.

## API

Reactabular provides **resolve** module for handling with these cases. The system relies on an iterator that accepts rows and then transforms it using a resolver.

### `resolve.resolve`

**`({ columns: <columns>, method: <resolver function>}) => <rows> => <rows>`**

The `resolve` iterator accepts columns and a method. When applied with rows, it will return resolved rows. A resolver function accepts a function with signature like this: `({ rowData, rowIndex, column }) => <resolved row>`.

### `resolve.index`

**`({ rowData, rowIndex }) => <resolved row>`**

`resolve.index` attached `rowIndex` at `_index` field of the returned row. This can be handy information to have for optimization purposes (`reactabular-tree`) but most often you don't have to use this one.

### `resolve.nested`

**`({ rowData, column }) => <resolved row>`**

The `nested` resolver digs rows from a `property: 'name.first'` kind of definition and maps the received value to property name. It replaces the original value with the resolved one.

### `resolve.byFunction`

**`(path: <string>) => ({ rowData, column }) => <resolved row>`**

The `byFunction` resolver accepts a path from where to look for a resolving function. It could be `column.cell.resolve` for example and you can use a nested definition for getting it from your column definition.

Instead of replacing the original value, `byFunction` generates `_<property>` kind of field to the resulting rows. Other functionality of Reactabular can use this hint and use the underscore field for user facing portions while using actual values for logic that relies on that.

## Combining Resolvers

If you want to combine resolvers, you can achieve it like this.

```javascript
const resolver = resolve({
  columns,
  method: ({ rowData, column }) => byFunction('cell.resolve')({
    rowData: nested({ rowData, column }),
    column
  })
});
```

## Resolution Example

The following example shows how you to resolve nested values.

**Example:**

```jsx
/*
import { resolve } from 'reactabular';
*/

const columns = [
  {
    property: 'color',
    header: {
      label: 'Color'
    }
  },
  {
    header: {
      label: 'Name'
    },
    children: [
      {
        property: 'name.first',
        header: {
          label: 'First Name'
        }
      },
      {
        property: 'name.last',
        header: {
          label: 'Last Name'
        }
      }
    ]
  },
  {
    header: {
      label: 'About'
    },
    children: [
      {
        property: 'company',
        header: {
          label: 'Company'
        }
      },
      {
        property: 'sentence',
        header: {
          label: 'Sentence'
        }
      }
    ]
  }
];

const rows = [
  {
    id: 1,
    color: 'red',
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    color: 'blue',
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  }
];

<ul>{
  resolve.resolve(
    { columns, method: resolve.nested }
  )(rows).map((d, i) =>
    <li key={`value-${i}`}>{JSON.stringify(d, null, 2)}</li>
  )
}</ul>
```

## See Also

* [All Features](http://reactabular.js.org/#/examples/all-features)
* [Drag and Drop](http://reactabular.js.org/#/examples/drag-and-drop)
