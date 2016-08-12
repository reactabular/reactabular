`reactabular-search-columns` provides a single component you can inject within a table header that allows you to search per column. It expects `columns` and `onChange` handler. The latter is used to update the search query based on the search protocol.

## How to Use?

Consider the example below.

**Example:**

```jsx
/*
import React from 'react';
import {
  Table, SearchColumns, search
} from 'reactabular';
*/

class SearchColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          property: 'name',
          header: {
            label: 'Name'
          }
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
      <Table.Provider columns={columns}>
        <Table.Header>
          <SearchColumns
            query={query}
            columns={columns}
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
