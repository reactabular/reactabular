The following example implements a formatter that provides handles for altering column widths.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
import { generateData, resizableColumn } from './helpers';
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
      getWidth: column => column.header.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.header.props.style = {
          ...column.header.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    this.state = {
      columns: [
        {
          header: {
            label: 'Name',
            format: resizable,
            props: {
              style: {
                width: 200
              }
            }
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Really Long Address Header',
            format: resizable,
            props: {
              style: {
                width: 300
              }
            }
          },
          cell: {
            property: 'address'
          }
        },
        {
          header: {
            label: 'Age',
            props: {
              style: {
                minWidth: 100,
                width: '100%'
              }
            }
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data
    };
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
        <Table.Header />

        <Table.Body row={this.onRow} />
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
