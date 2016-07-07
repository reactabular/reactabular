Root level `props` allows you to attach props to all header and content cells. The `props` injected by more specific configuration can override these.

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

## Sticky Headers Example

The following example implements sticky headers within a fixed viewport through `props`.

```jsx
<StickyHeaderTable />
```

```code
lang: jsx
---
import ReactDOM from 'react-dom';
import React from 'react';

import { generateData } from './helpers';
import {
  Table
} from 'reactabular';

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
const data = generateData(100, schema);

export default class StickyHeaderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      columns: this.getColumns()
    };

    this.onHeaderScroll = this.onHeaderScroll.bind(this);
    this.onBodyScroll = this.onBodyScroll.bind(this);
  }
  getColumns() {
    return [
      {
        props: {
          style: { minWidth: 300, width: 300 }
        },
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name'
        }
      },
      {
        props: {
          style: { minWidth: 100, width: 100 }
        },
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age'
        }
      },
      {
        props: {
          style: { minWidth: 400, width: 400 }
        },
        header: {
          label: 'Company'
        },
        cell: {
          property: 'company'
        }
      },
      {
        props: {
          style: { minWidth: 400, width: 400 }
        },
        header: {
          label: 'Product'
        },
        cell: {
          property: 'product'
        }
      }
    ];
  }
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={this.state.columns}
        data={this.state.data}
        rowKey="id"
      >
        <Table.Header
          style={{
            display: 'block',
            overflow: 'auto',
            maxWidth: 800
          }}
          onScroll={this.onHeaderScroll}
          ref={e => {
            if (e) {
              this.tableHeader = e;
            }
          }}
        />

        <Table.Body
          style={{
            display: 'block',
            overflow: 'auto',
            maxHeight: 400,
            maxWidth: 800
          }}
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row'
          })}
          onScroll={this.onBodyScroll}
          ref={e => {
            if (e) {
              this.tableBody = e;
            }
          }}
        />
      </Table.Provider>
    );
  }
  onHeaderScroll({ target: { scrollLeft } }) {
    if (!this.tableBody) {
      return;
    }

    ReactDOM.findDOMNode(this.tableBody).scrollLeft = scrollLeft;
  }
  onBodyScroll({ target: { scrollLeft } }) {
    if (!this.tableHeader) {
      return;
    }

    ReactDOM.findDOMNode(this.tableHeader).scrollLeft = scrollLeft;
  }
}
```
