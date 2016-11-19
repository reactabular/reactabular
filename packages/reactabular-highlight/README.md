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
import {
  Table, search, Search, highlight, resolve
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
          children: [
            {
              property: 'name.first',
              header: {
                label: 'First Name'
              },
              cell: {
                format: highlight.cell
              }
            },
            {
              property: 'name.last',
              header: {
                label: 'Last Name'
              },
              cell: {
                format: highlight.cell
              }
            }
          ]
        },
        {
          property: 'age',
          header: {
            label: 'Age'
          },
          cell: {
            format: highlight.cell
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
    const { rows, columns, query } = this.state;
    const filteredRows = compose(
      highlight.highlighter({ columns, matches: search.matches, query }),
      search.multipleColumns({ columns, query }),
      resolve.resolve({ columns, method: resolve.nested })
    )(rows);

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

          <Table.Body rows={filteredRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<HighlightTable />
```
