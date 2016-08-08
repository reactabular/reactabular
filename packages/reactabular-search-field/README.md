`reactabular-search-field` provides a search field you can integrate to your Reactabular project.

## How to Use?

Consider the example below.

**Example:**

```jsx
/*
import React from 'react';
import {
  Table, search, Search
} from 'reactabular';
*/

class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age'
          }
        }
      ],
      rows: [
        {
          id: 100,
          name: 'Adam',
          age: 12
        },
        {
          id: 101,
          name: 'Brian',
          age: 7
        },
        {
          id: 102,
          name: 'Jake',
          age: 88
        },
        {
          id: 103,
          name: 'Jill',
          age: 50
        }
      ]
    };
  }
  render() {
    const { rows, columns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            query={query}
            columns={columns}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider columns={columns}>
          <Table.Header />

          <Table.Body rows={searchedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<SearchTable />
```
