To make it possible to highlight search results per column, there's a specific `highlight.cell` formatter. To use it, you'll first you have to annotate your data using `highlight.highlighter`. It attaches a structure like this there:

```code
lang: javascript
---
_highlights: {
  demo: [{ startIndex: 0, length: 4 }]
}
```

**Example:**

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import { Search } from './helpers';
import {
  Table, search, highlight
} from 'reactabular';
*/

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {},
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name',
            format: highlight.cell
          }
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age',
            format: highlight.cell
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
      highlight.highlighter({ columns, matches: search.matches, query }),
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
