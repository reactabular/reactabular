`reactabular-search-field` provides a search field you can integrate to your Reactabular project.

## How to Use?

Consider the example below.

**Example:**

```jsx
/*
import React from 'react';
import {
  Table, Search, resolve
} from 'reactabular';
import * as search from 'searchtabular';
*/

class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
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
    const { searchColumn, columns, rows, query } = this.state;
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
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            column={searchColumn}
            query={query}
            columns={resolvedColumns}
            rows={resolvedRows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider columns={resolvedColumns}>
          <Table.Header
            headerRows={resolve.headerRows({ columns })}
          />

          <Table.Body rows={searchedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<SearchTable />
```
