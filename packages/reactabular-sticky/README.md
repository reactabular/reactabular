Sometimes you might want to display data within a fixed container. That's where `reactabular-sticky` comes in. It includes logic keeping a table header and a table body in sync. Unfortunately you still need to dig DOM references yourself to achieve this given it relies on measuring.

## API

The API is exactly the same as for `reactabular-table` apart from naming. Here you need to use `Sticky.Provider`, `Sticky.Header` and `Sticky.Body` over `Table.Provider`, `Table.Header` and `Table.Body`.

## How to Use?

The following example implements sticky headers within a fixed viewport through `props`.

```jsx
/*
import React from 'react';
import { Table, Sticky } from 'reactabular';
// import * as Sticky from 'reactabular-sticky';

import { generateRows } from './helpers';
*/

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
const rows = generateRows(100, schema);

const columns = [
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

class StickyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns,
      scroll: {}
    };

    this.onScroll = this.onScroll.bind(this);
  }
  render() {
    const { rows, columns, scroll } = this.state;

    return (
      <Sticky.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        onScroll={this.onScroll}
      >
        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          scroll={scroll}
        />

        <Sticky.Body
          rows={rows}
          rowKey="id"
          style={{
            maxWidth: 800,
            maxHeight: 400
          }}
          scroll={scroll}
        />
      </Sticky.Provider>
    );
  }
  onScroll(scroll) {
    this.setState({ scroll });
  }
}

<StickyTable />
```
