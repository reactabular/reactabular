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
  Table, Search, highlight, resolve
} from 'reactabular';
import * as search from 'searchtabular';
*/

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
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
                formatters: [highlight.cell]
              }
            },
            {
              property: 'name.last',
              header: {
                label: 'Last Name'
              },
              cell: {
                formatters: [highlight.cell]
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
            formatters: [highlight.cell]
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
    const searchedRows = compose(
      highlight.highlighter({
        columns: resolvedColumns,
        matches: search.matches,
        query
      }),
      search.multipleColumns({
        columns: resolvedColumns,
        query
      }),
    )(resolvedRows);

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

<HighlightTable />
```
