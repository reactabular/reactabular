The following example shows how to combine sorting with search. It is possible to reset sorting by double clicking on a header.

```jsx
/*
import React from 'react';
import orderBy from 'lodash/orderBy';
import { Table, sort, search } from 'reactabular';

import { generateRows, Search } from './helpers';
*/

const { Table, sort, search } = reactabular;

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'company', 'age']
};
const rows = generateRows(20, schema);

class SortAndSearchTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = sort.sort({
      // Point the transform to your rows. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || {},

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });
    const sortableHeader = sortHeader(sortable);

    const resetable = (value, { columnIndex }) => ({
      onDoubleClick: () => {
        const sortingColumns = this.state.sortingColumns;

        if (!sortingColumns || !sortingColumns.length) {
          return;
        }

        const position = sortingColumns[columnIndex].position;
        const newSortingColumns = {};

        delete sortingColumns[columnIndex];

        Object.keys(sortingColumns).forEach(k => {
            const column = sortingColumns[k];

            if (column.position > position) {
                newSortingColumns[k] = {
                    ...column,
                    position: column.position - 1,
                };
            } else {
                newSortingColumns[k] = column;
            }
        });

        this.setState({
            sortingColumns: newSortingColumns
        });
      }
    });

    this.state = {
      query: {}, // Search query
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          header: {
            label: 'Name',
            // Resetable operates on cell level while sorting is handled by
            // an element within -> no conflict between click and double click.
            transforms: [resetable],
            format: sortableHeader
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Company',
            transforms: [resetable],
            format: sortableHeader
          },
          cell: {
            property: 'company'
          }
        },
        {
          header: {
            label: 'Age',
            transforms: [resetable],
            format: sortableHeader
          },
          cell: {
            property: 'age'
          }
        }
      ],
      rows
    };
  }
  render() {
    const { rows, columns, sortingColumns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);
    const sortedRows = sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy
    })(searchedRows);

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

          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

function sortHeader(sortable) {
  return (value, { columnIndex }) => (
    <div style={{ display: 'inline' }}>
      <span className="value">{value}</span>
      {columnIndex >= 0 &&
        <span className="sort-order" style={{ marginLeft: '0.5em' }}>
          {columnIndex + 1}
        </span>
      }
      {React.createElement(
        'span',
        sortable(
          value,
          {
            columnIndex
          }
        )
      )}
    </div>
  );
}

<SortAndSearchTable />
```
