To make it possible to highlight search results per column, there's a specific `highlight` formatter. It expects you to pass a highlighter function. That returns the highlighted portions using `[{ startIndex: <number>, length: <number> }]` kind of format. A search helper known as `search.matches` uses this format and works well with the highlighter.

**Example:**

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import { Search } from './helpers';
import {
  Table, search, formatters, highlight
} from 'reactabular';
*/

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    const highlighted = formatters.highlighted;

    this.state = {
      query: {},
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name',
            format: highlighted
          }
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age',
            format: highlighted
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
    const filteredData = compose(
      highlight({ matches: search.matches, query }),
      search.multipleColumns({ columns, query })
    )(data);

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
        <Table.Provider columns={columns} data={filteredData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
}

<HighlightTable />
```
