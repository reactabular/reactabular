The following example shows how to expand a column to take available space.

```jsx
/*
import React from 'react';
import * as Table from 'reactabular-table';
*/

const columns = [
  {
    property: 'name',
    // Fix column width to 200px
    headerCell: () => <th style={{ width: 200 }}>Name</th>
  },
  {
    property: 'dad',
    // Calculate remaining space
    headerCell: () => <th style={{ width: 'calc(100% - 200px)' }}>Dad</th>
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
