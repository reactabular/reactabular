The following example shows how to expand a column to take available space.

```jsx
/*
import React from 'react';
import * as Table from 'reactabular-table';
*/

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name',
      props: {
        style: {
          // Fix column width to 200px
          width: 200
        }
      }
    }
  },
  {
    property: 'dad',
    header: {
      label: 'Dad',
      props: {
        style: {
          // Calculate remaining space
          width: 'calc(100% - 200px)'
        }
      }
    }
  }
];

const ExpandColumnToFitTable = () => (
  <Table.Provider columns={columns}>
    <Table.Header />
    <Table.Body rows={rows} rowKey="id" />
  </Table.Provider>
);

<ExpandColumnToFitTable />
```
