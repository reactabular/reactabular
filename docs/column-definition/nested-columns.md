Given sometimes you might want to display rows in a nested manner, there's a `children` field for that. It accepts an array of column definitions and is recursive. If `children` has been set, then `cell` specific sibling field won't do anything. `header` will still work as usual.

**Example:**

```jsx
/*
import React from 'react';
import { Table, resolve } from 'reactabular';
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

const NestedColumnsTable = () => (
  <Table.Provider columns={columns}>
    <Table.Header />

    <Table.Body
      rows={resolve.resolve({ columns, method: resolve.nested })(rows)}
      rowKey="id"
    />
  </Table.Provider>
);

<NestedColumnsTable />
```

## See Also

* [Resolving](/resolving)
