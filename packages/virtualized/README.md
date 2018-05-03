`@reactabular/virtualized` works in conjunction with `reactabular-sticky` and provides virtualization. The idea is that instead of rendering all table cells, it renders only ones visible at the viewport. This improves performance significantly with larger datasets.

> If you want extra logging during development, set `window.LOG_VIRTUALIZED = true` at console.

**Example:**

```jsx
/*
import React from 'react';
import * as Sticky from '@reactabular/sticky';
import * as Virtualized from '@reactabular/virtualized';
import * as resolve from 'table-resolver';

import { generateRows } from '@reactabular/helpers';
*/

const headerCell = name => ({ column: { props } }) => <th {...props}>{name}</th>;
const bodyCell = ({ children, column: { props } }) => <td {...props}>{children}</td>;

const columns = [
  {
    props: {
      style: { minWidth: 50 }
    },
    headerCell: headerCell('Index'),
    bodyCell: ({ renderer, rowIndex, column: { props } }) => (
      React.createElement(renderer, { props }, rowIndex)
    )
  },
  {
    property: 'name',
    props: {
      style: { minWidth: 300 }
    },
    headerCell: headerCell('Name'),
    bodyCell
  },
  {
    property: 'age',
    props: {
      style: { minWidth: 100 }
    },
    headerCell: headerCell('Age'),
    bodyCell
  },
  {
    property: 'company',
    props: {
      style: { minWidth: 400 }
    },
    headerCell: headerCell('Company'),
    bodyCell
  },
  {
    property: 'product',
    props: {
      style: { minWidth: 400 }
    },
    headerCell: headerCell('Product'),
    bodyCell
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
const rows = resolve.resolve({ columns })(generateRows(1000, schema));

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
      <div>
        <div>
          <label>Scroll to index: </label>
          <input
            type="text"
            onChange={e => this.tableBody.scrollTo(e.target.value)}
          />
        </div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          renderers={{
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
      </div>
    );
  }
}

<VirtualizedTable />
```

## Scrolling to Index

`Virtualized.Body` `ref` exposes `scrollTo` method for scrolling through index. If you want to scroll based on some field value, search the dataset first and pass the resulting index here.

## Define the Height of Table

Please note `height` of `<Virtualized.Body>` must be defined. If `height` is not defined, `style.maxHeight` will be used. In below example, we use `style.maxHeight` instead of `height`,

```jsx
/*
import React from 'react';
import * as Sticky from '@reactabular/sticky';
import * as Virtualized from '@reactabular/virtualized';
import { generateRows } from '@reactabular/helpers';
*/
const headerCell = name => ({ column: { props } }) => <th {...props}>{name}</th>;
const bodyCell = ({ children, column: { props } }) => <td {...props}>{children}</td>;

const columns = [
  {
    property: 'id',
    props: {
      style: { minWidth: 350 }
    },
    headerCell: headerCell('Index'),
    bodyCell
  },
  {
    property: 'name',
    props: {
      style: { minWidth: 300 }
    },
    headerCell: headerCell('Name'),
    bodyCell
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
    }
  },
  required: ['id', 'name']
};
const rows = generateRows(1000, schema);

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
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          renderers={{
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
              maxWidth: 800,
              maxHeight: 400
            }}
            ref={tableBody => {
              this.tableBody = tableBody && tableBody.getRef();
            }}
            tableHeader={this.tableHeader}
          />
        </Table.Provider>
      </div>
    );
  }
}

<VirtualizedTable />
```

## Using relative column widths

You can define column widths as percentages of the table's width, like so:

```javascript
const columns = [
  {
    property: 'id',
    props: {
      style: { width: "35%" }
    },
    ...
```

To force rows to stretch to the full width of the `tbody` container, however, a `flex`-based styling workaround is required. [This StackOverflow answer](http://stackoverflow.com/a/29512692/629578) suggests the configuration below. If this does not work for you, due to other styling constraints or concerns about browser compatibility, you may consider the other answers posted there, or you may need to take care of your column sizing and resizing in JavaScript.

```css
{
  display: flex;
  flex-flow: column;

  thead,
  tbody tr {
    display: table;
    table-layout: fixed;
  }

  thead {
    flex: 0 0 auto;
    width: 100%;
    background: #eaeaea;
    tr {
      width: calc(100% - 0.9em); /* 0.9em approximates scrollbar width */
      display: table;
    }
  }

  tbody {
    display: block;
    flex: 1 1 auto;
    overflow-y: scroll;

    tr {
      width: 100%;
    }
  }
}
```
