Sometimes you might want to display data within a fixed container. That's where `@reactabular/sticky` comes in. It includes logic keeping a table header and a table body in sync. Unfortunately you still need to dig DOM references yourself to achieve this given it relies on measuring.

## API

The API is exactly the same as for `@reactabular/table` apart from naming. Here you need to use `Sticky.Header` and `Sticky.Body` over `Table.Header` and `Table.Body`.

## How to Use?

The following example implements sticky headers within a fixed viewport through `props`.

```jsx
/*
import React from 'react';
import { Table } from '@reactabular/table';
import * as Sticky from '@reactabular/sticky';
import { generateRows } from '@reactabular/helpers';
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
const headerCell = name => ({ column: { props } }) => <th {...props}>{name}</th>;
const bodyCell = ({ children, column: { props } }) => <td {...props}>{children}</td>;

const columns = [
  {
    props: { style: { minWidth: 200 }},
    property: 'name',
    headerCell: headerCell('Name'),
    bodyCell
  },
  {
    props: { style: { minWidth: 100 }},
    property: 'age',
    headerCell: headerCell('Age'),
    bodyCell
  },
  {
    props: { style: { minWidth: 300 }},
    property: 'company',
    headerCell: headerCell('Company'),
    bodyCell
  },
  {
    props: { style: { minWidth: 400 }},
    property: 'product',
    headerCell: headerCell('Product'),
    bodyCell
  }
];

class StickyTable extends React.Component {
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
            this.tableHeader = tableHeader && tableHeader.getRef();
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
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
}

<StickyTable />
```
