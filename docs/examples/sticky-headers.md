The following example implements sticky headers within a fixed viewport through `props`.

```jsx
/*
import ReactDOM from 'react-dom';
import React from 'react';

import { generateRows, Sticky } from './helpers';
import { Table } from 'reactabular';
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

class StickyHeaderTable extends React.Component {
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
    const { rows, columns } = this.state;

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
      >
        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          ref={tableHeader => {
            if (tableHeader) {
              this.tableHeader = ReactDOM.findDOMNode(tableHeader);
            }
          }}
          tableBody={this.tableBody}
        />

        <Sticky.Body
          rows={rows}
          rowKey="id"
          style={{
            maxWidth: 800,
            maxHeight: 400
          }}
          ref={tableBody => {
            if (tableBody) {
              this.tableBody = ReactDOM.findDOMNode(tableBody);
            }
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
}

<StickyHeaderTable />
```
