The following example implements a formatter that provides handles for altering column widths.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
import { generateData, resizableColumn, Sticky } from './helpers';
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
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age']
};
const data = generateData(100, schema);

class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.props.style = {
          ...column.props.style,
          width,
          minWidth: width
        };

        this.setState({ columns });
      }
    });

    this.state = {
      columns: [
        {
          props: {
            style: {
              minWidth: 200,
              width: 200
            }
          },
          header: {
            label: 'Name',
            format: resizable
          },
          cell: {
            property: 'name'
          }
        },
        {
          props: {
            style: {
              minWidth: 400,
              width: 400
            }
          },
          header: {
            label: 'Really Long Address Header',
            format: resizable
          },
          cell: {
            property: 'address'
          }
        },
        {
          props: {
            style: {
              minWidth: 200,
              width: 200
            }
          },
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data
    };

    this.tableHeader = null;
    this.tableBody = null;
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
        rowKey="id"
        style={{ width: 'auto' }}
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
          onScroll={scrollLeft => (
            this.tableBody.scrollLeft = scrollLeft
          )}
        />

        <Sticky.Body
          style={{
            maxWidth: 800,
            maxHeight: 400
          }}
          ref={tableBody => {
            if (tableBody) {
              this.tableBody = ReactDOM.findDOMNode(tableBody);
            }
          }}
          onScroll={scrollLeft => (
            this.tableHeader.scrollLeft = scrollLeft
          )}
          row={this.onRow}
        />
      </Table.Provider>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
    };
  }
}

<ResizableColumnsTable />
```
