`@reactabular/resizable` implements a formatter that provides handles for altering column widths. It provides two functions:

* `column({ parent = document, onDrag, minWidth = 10, props: { ... }})`. This formatter does most of the work.
* `helper({ globalId, getId })` returns an object with `initialize({ columns, getId: (column, index) => ...})`, `cleanup()`, and `update({ column, width })` methods. The helper can be used with the formatter to implement performant resizing. It utilizes CSS stylesheets for this purpose. It also expects you set `width` per each column at your column definition.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

If you want to resizing with nested column, give a `resizableFormatter` formatter on children **except parent column**.
Below example included nested column. If you don't want to using nested column, remove related nested columns code.

## How to Use?

The following example adjusts column widths through CSS to keep the performance high while using a sticky header/body. This way we can avoid touching the DOM through React and let the browser do the work.

You can customize `props` of specific portions through the following protocol:

```javascript
props = {
  container: {},
  value: {},
  handle: {}
}
```

> You can find suggested default styling for the package at `style.css` in the package root.

```jsx
/*
import React from 'react';
import * as Table from '@reactabular/table';
import * as Sticky from '@reactabular/sticky';
import * as resizable from '@reactabular/resizable';
import { generateRows } from '@reactabular/helpers';
import uuid from 'uuid';
import * as resolve from 'table-resolver';
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
    address: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age', 'company']
};
const rows = generateRows(100, schema);

class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows
    };

    this.tableHeader = null;
    this.tableBody = null;
  }
  componentWillMount() {
    this.resizableHelper = resizable.helper({
      globalId: uuid.v4(),
      getId: ({ property}) => property
    });

    // Patch the column definition with class names.
    this.setState({
      columns: this.resizableHelper.initialize(this.state.columns)
    });
  }
  componentWillUnmount() {
    this.resizableHelper.cleanup();
  }
  getColumns() {
    const resizableFormatter = resizable.column({
      onDragStart: (width, { column }) => {
        console.log('drag start', width, column);
      },
      onDrag: (width, { column }) => {
        this.resizableHelper.update({
          column,
          width
        });
      },
      onDragEnd: (width, { column }) => {
        console.log('drag end', width, column);
      }
    });

    return [
      {
        property: 'name',
        header: {
          label: 'Name',
          formatters: [
            resizableFormatter
          ]
        },
        width: 100
      },
      {
        header: {
          label: 'About'
        },
        children: [
          {
            property: 'company',
            header: {
              label: 'Company',
              formatters: [
                resizableFormatter
              ],
            },
            width: 100
          },
          {
            property: 'address',
            header: {
              label: 'Address',
              formatters: [
                resizableFormatter
              ],
            },
            width: 200
          },
        ],
      },
      {
        property: 'age',
        header: {
          label: 'Age'
        }
      }
    ];
  }
  getClassName(column, i) {
    return `column-${this.id}-${i}`;
  }
  render() {
    const { rows, columns } = this.state;

    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested
      })(rows);

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={resolvedColumns}
        style={{ width: 'auto' }}
      >
        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          headerRows={resolve.headerRows({ columns })}
          ref={tableHeader => {
            this.tableHeader = tableHeader && tableHeader.getRef();
          }}
          tableBody={this.tableBody}
        />

        <Sticky.Body
          rows={resolvedRows}
          rowKey="id"
          onRow={this.onRow}
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
  onRow(row, { rowIndex }) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
    };
  }
}

<ResizableColumnsTable />
```

## How to Move the Widget to the Column Border?

Given it can be neater to have the resize widget at the column border, you can offset it like this:

```css
.resize-handle {
  margin-right: -1em; /* offset based on padding */
}
```

You will need to figure out the exact offset based on your header cell size.
