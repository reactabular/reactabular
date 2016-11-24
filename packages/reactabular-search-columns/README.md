`reactabular-search-columns` provides a single component you can inject within a table header that allows you to search per column. It expects `columns` and `onChange` handler. The latter is used to update the search query based on the search protocol.

## How to Use?

Consider the example below.

**Example:**

```jsx
/*
import React from 'react';
import {
  Table, SearchColumns, search, resolve
} from 'reactabular';
*/

class SearchColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          children: [
            {
              property: 'name.first',
              header: {
                label: 'First Name'
              }
            },
            {
              property: 'name.last',
              header: {
                label: 'Last Name'
              }
            }
          ]
        },
        {
          property: 'age',
          header: {
            label: 'Age'
          }
        }
      ],
      rows: [
        {
          id: 100,
          name: {
            first: 'Adam',
            last: 'West'
          },
          age: 10
        },
        {
          id: 101,
          name: {
            first: 'Brian',
            last: 'Eno'
          },
          age: 43
        },
        {
          id: 103,
          name: {
            first: 'Jake',
            last: 'Dalton'
          },
          age: 33
        },
        {
          id: 104,
          name: {
            first: 'Jill',
            last: 'Jackson'
          },
          age: 63
        }
      ]
    };
  }
  render() {
    const { columns, query, rows } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);
    const searchedRows = search.multipleColumns({
      columns: resolvedColumns,
      query
    })(resolvedRows);

    return (
      <Table.Provider columns={resolvedColumns}>
        <Table.Header
          headerRows={resolve.headerRows({ columns })}
        >
          <SearchColumns
            query={query}
            columns={resolvedColumns}
            onChange={query => this.setState({ query })}
          />
        </Table.Header>

        <Table.Body rows={searchedRows} rowKey="id" />
      </Table.Provider>
    );
  }
}

<SearchColumnsTable />
```
