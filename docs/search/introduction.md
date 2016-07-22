Reactabular comes with search helpers. It consists of search algorithms that can be applied to the rows. Just like with sorting, you have to apply it to the rows just before rendering. A column is considered searchable in case it has a unique `property` defined.

The general workflow goes as follows:

1. Set up a `Search` control that outputs a query in `{<column>: <query>}` format. If `<column>` is `all`, then the search will work against all columns. Otherwise it will respect the exact columns set.
2. Before rendering the rows, perform `search.multipleColumns({ columns, query })(rows)`. This will filter the rows based on the passed `rows`, `columns` definition, and `query`. A lazy way to do this is to filter at `render()` although you can do it elsewhere too to optimize rendering.
3. Pass the filtered rows to `Table`.

**Example:**

```jsx
/*
import React from 'react';
import { Search } from './helpers';
import {
  Table, search
} from 'reactabular';
*/

const { Table, search } = reactabular;

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

> You can find the `Search` helper from `docs/helpers` to get the basic idea. It's not included in the core distribution.

## See Also

* [Sort and Search](/examples/sort-and-search)
