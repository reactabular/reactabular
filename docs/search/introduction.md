Reactabular comes with search helpers. It consists of search algorithms that can be applied to the data. Just like with sorting, you have to apply it to the data just before rendering. A column is considered searchable in case it has a unique `property` defined.

The general workflow goes as follows:

1. Set up a `Search` control that outputs a query in `{<column>: <query>}` format. If `<column>` is `all`, then the search will work against all columns. Otherwise it will respect the exact columns set.
2. Before rendering the data, perform `search.multipleColumns({ columns, query })(data)`. This will filter the data based on the passed `data`, `columns` definition, and `query`. A lazy way to do this is to filter at `render()` although you can do it elsewhere too to optimize rendering.
3. Pass the filtered data to `Table`.

**Example:**

```jsx
/*
import React from 'react';
import { Search } from './helpers';
import {
  Table, search
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
      data: [
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
    const { data, columns, query } = this.state;
    const searchedData = search.multipleColumns({ columns, query })(data);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider columns={columns} data={searchedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
}

<SearchTable />
```

> You can find the `Search` helper from `docs/helpers` to get the basic idea. It's not included in the core distribution.
