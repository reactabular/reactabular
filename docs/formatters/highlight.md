To make it possible to highlight search results per column, there's a specific `highlight` formatter. It expects you to pass a highlighter function. That returns the highlighted portions using `[{ startIndex: <number>, length: <number> }]` kind of format. A search helper known as `search.matches` uses this format and works well with the highlighter.

**Example:**

```react
<HighlightTable />
```

```code
lang: jsx
---
import React from 'react';
import { Table, search, formatters } from 'reactabular';

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    const highlight = column => formatters.highlight(value => (
      // We have an individual cell value here. For the highlighting
      // algorithm to work we'll need to figure out possible matches.
      // The highlighter is able to return proper elements based on
      // this information.
      search.matches({
        value,
        query: this.state.query[column] || this.state.query.all
      })
    ));

    this.state = {
      query: {},
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name',
            format: highlight('name')
          }
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age',
            format: highlight('age')
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
    let searchedData = search.multipleColumns({ data, columns, query });

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
```
