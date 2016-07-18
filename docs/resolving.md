Sometimes your data might come in a nested format or it might have a representation that maps to the underlying value. A name split to first and last parts is an example of the former. Country code to country mapping is an example of the latter.

Reactabular provides **resolve** module for handling with these cases. The system relies on an iterator that accepts data and then transforms it using a resolver.

## `resolve.resolve = ({ columns: <columns>, method: <resolver function>}) => <data> => <data>` Iterator

The `resolve` iterator accepts columns and a method. When applied with data, it will return resolved data.

## `resolve.nested = (row, column) => <resolved row>` Resolver

The `nested` resolver digs data from a `property: 'name.first'` kind of definition and maps the received value to property name. It replaces the original value with the resolved one.

## `resolve.byFunction = (path: <string>) => (row, column) => <resolved row>` Resolver

The `byFunction` resolver accepts a path from where to look for a resolving function. It could be `column.cell.resolve` for example and you can use a nested definition for getting it from your column definition.

Instead of replacing the original value, `byFunction` generates `_<property>` kind of field to the resulting data. Other functionality of Reactabular can use this hint and use the underscore field for user facing portions while using actual values for logic that relies on that.

## Resolution Example

The following example shows how you to resolve nested values.

**Example:**

```jsx
/*
import { resolve } from 'reactabular';
*/

const columns = [
  {
    header: {
      label: 'Color'
    },
    cell: {
      property: 'color'
    }
  },
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
      }
    ]
  },
  {
    header: {
      label: 'About'
    },
    children: [
      {
        header: {
          label: 'Company'
        },
        cell: {
          property: 'company'
        }
      },
      {
        header: {
          label: 'Sentence'
        },
        cell: {
          property: 'sentence'
        }
      }
    ]
  }
];

const data = [
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
  )(data).map((d, i) =>
    <li key={`value-${i}`}>{JSON.stringify(d, null, 2)}</li>
  )
}</ul>
```

## See Also

* [All Features](/examples/all-features)
* [Drag and Drop](/examples/drag-and-drop)
