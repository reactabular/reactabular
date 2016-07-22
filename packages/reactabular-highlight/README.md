To make it possible to highlight search results per column, there's a specific `highlight.cell` formatter.

## How to Use?

To use it, you'll first you have to annotate your rows using `highlight.highlighter`. It attaches a structure like this there:

```javascript
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

const { Table, search, highlight } = reactabular;

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
    const filteredRows = compose(
      highlight.highlighter({ columns, matches: search.matches, query }),
      search.multipleColumns({ columns, query })
    )(rows);

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

          <Table.Body rows={filteredRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<HighlightTable />
```
