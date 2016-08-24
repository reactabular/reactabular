`reactabular-virtualized` works in conjunction with `reactabular-sticky` and enhances performance by implementing a technique known as virtualization. The idea is that instead of rendering all table cells, it renders only ones visible at the viewport.

**Example:**

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
*/

class VirtualizedTable extends React.Component {
  render() {
    return (
      <Table.Provider
        columns={columns}
      >
        <Table.Header />

        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
  }
}

<VirtualizedTable />
```
