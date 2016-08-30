`reactabular-virtualized` works in conjunction with `reactabular-sticky` and provides virtualization. The idea is that instead of rendering all table cells, it renders only ones visible at the viewport. This improves performance significantly with larger datasets.

**Example:**

```jsx
/*
import React from 'react';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';
import * as resolve from 'reactabular-resolve';

import { generateRows } from './helpers';
*/

const columns = [
  {
    props: {
      style: { minWidth: 50 }
    },
    header: {
      label: 'Index'
    },
    cell: {
      format: (value, { rowIndex }) => <span>{rowIndex}</span>
    }
  },
  {
    property: 'name',
    props: {
      style: { minWidth: 300 }
    },
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    props: {
      style: { minWidth: 100 }
    },
    header: {
      label: 'Age'
    }
  },
  {
    property: 'company',
    props: {
      style: { minWidth: 400 }
    },
    header: {
      label: 'Company'
    }
  },
  {
    property: 'product',
    props: {
      style: { minWidth: 400 }
    },
    header: {
      label: 'Product'
    }
  }
];

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    product: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'product', 'company', 'age']
};
// Resolving indices is an optional step. You can skip it if you don't
// rely on rowIndex anywhere. But if you do, it's good to calculate and
// include to the data. Reactabular's rendering logic is able to pick it
// up by convention (`_index` field).
const rows = resolve.resolve({
  columns,
  method: resolve.index
})(generateRows(1000, schema));

class VirtualizedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns
    };

    this.tableHeader = null;
    this.tableBody = null;
  }
  componentDidMount() {
    // We have refs now. Force update to get those to Header/Body.
    this.forceUpdate();
  }
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        components={{
          body: {
            wrapper: Virtualized.BodyWrapper,
            row: Virtualized.BodyRow
          }
        }}
      >
        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          ref={tableHeader => {
            this.tableHeader = tableHeader && tableHeader.getRef();
          }}
          tableBody={this.tableBody}
        />

        <Virtualized.Body
          rows={rows}
          rowKey="id"
          style={{
            maxWidth: 800
          }}
          height={400}
          ref={tableBody => {
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
}

<VirtualizedTable />
```
