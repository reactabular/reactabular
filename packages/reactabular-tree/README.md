`reactabular-tree` provides tree helpers for Reactabular.

**Example:**

```jsx
/*
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { Table, search, Search, sort, resolve } from 'reactabular';
import * as tree from 'reactabular-tree';
import VisibilityToggles from 'reactabular-visibility-toggles';

import {
  generateParents, generateRows
} from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age']
};
const rows = generateParents(generateRows(100, schema));

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    const columns = this.getColumns();
    const allRows = resolve.resolve(
      {
        columns,
        method: resolve.index
      }
    )(rows);

    this.state = {
      searchColumn: 'all',
      query: {},
      sortingColumns: null,
      allRows: allRows,
      filteredRows: allRows,
      rowsShowingChildren: [],
      columns
    };

    this.onSearch = this.onSearch.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  getColumns() {
    const sortable = sort.sort({
      // Point the transform to your rows. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || {},

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        const { columns, sortingColumns, filteredRows } = this.state;

        this.setState(
          sortTree({
            selectedColumn,
            columns,
            sortingColumns,
            rows: filteredRows
          })
        );
      }
    });

    return [
      {
        property: 'name',
        props: {
          style: { width: 200 }
        },
        header: {
          label: 'Name',
          transforms: [sortable]
        },
        cell: {
          format: (name, { rowData }) => {
            const { allRows, rowsShowingChildren } = this.state;
            const cellIndex = rowData._index;

            return (
              <div style={{ paddingLeft: `${tree.getLevel(allRows, cellIndex) * 1}em` }}>
                {tree.hasChildren(allRows, cellIndex) && <span
                  className={rowsShowingChildren.indexOf(cellIndex) >= 0 ? 'show-less' : 'show-more'}
                  onClick={e => {
                    const { rowsShowingChildren } = this.state;
                    const index = rowsShowingChildren.indexOf(cellIndex);

                    if (index >= 0) {
                      this.setState({
                        rowsShowingChildren: rowsShowingChildren.
                          slice(0, index).
                          concat(
                            rowsShowingChildren.slice(index + 1)
                          )
                      })
                    }
                    else {
                      this.setState({
                        rowsShowingChildren: rowsShowingChildren.concat([cellIndex])
                      });
                    }
                  }}
                />}
                {name}
              </div>
            );
          }
        },
        visible: true
      },
      {
        property: 'age',
        props: {
          style: { width: 300 }
        },
        header: {
          label: 'Age',
          transforms: [sortable]
        },
        visible: true
      }
    ];
  }
  render() {
    const {
      searchColumn, columns, sortingColumns,
      allRows, filteredRows, rowsShowingChildren, query,
    } = this.state;
    const visibleColumns = columns.filter(column => column.visible);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <div className="search-container">
          <span>Search</span>
          <Search
            column={searchColumn}
            query={query}
            columns={visibleColumns}
            rows={allRows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={this.onSearch}
          />
        </div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={visibleColumns}
        >
          <Table.Header />

          <Table.Body
            onRow={this.onRow}
            rows={tree.filter(filteredRows, rowsShowingChildren)}
            rowKey="id"
          />
        </Table.Provider>
      </div>
    );
  }
  onSearch(nextQuery) {
    const { columns, sortingColumns, allRows, filteredRows, query } = this.state;
    const visibleColumns = columns.filter(column => column.visible);

    const queryLength = getQueryLength(query);
    const nextQueryLength = getQueryLength(nextQuery);

    const newRows = searchTree({
      column: visibleColumns,
      rows: nextQueryLength > queryLength ? filteredRows : allRows,
      query: nextQuery
    });

    // Restore sorting. This could be pushed further by composing
    // search and sort (avoids one pack/unpack).
    if (nextQueryLength < queryLength) {
      this.setState({
        ...sortTree({
          columns,
          sortingColumns,
          rows: newRows
        }),
        query: nextQuery
      });
    }
    else {
      this.setState({
        filteredRows: newRows,
        query: nextQuery
      });
    }
  }
  onToggleColumn(columnIndex) {
    const columns = this.state.columns;

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
}

function sortTree({ columns, sortingColumns, selectedColumn, rows }) {
  let newSortingColumns;

  if (selectedColumn >= 0) {
    newSortingColumns = sort.byColumns({ // sort.byColumn would work too
      sortingColumns,
      selectedColumn
    });
  }

  const newRows = sortTreeKernel({
    columns: columns.filter(column => column.visible),
    sortingColumns: newSortingColumns || sortingColumns,
    rows
  });

  return {
    filteredRows: newRows,
    sortingColumns: newSortingColumns || sortingColumns
  };
}

function sortTreeKernel({ columns, sortingColumns, rows}) {
  return compose(
    tree.unpack,
    sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy
    }),
    tree.pack
  )(rows);
}

function searchTree({ column, rows, query }) {
  return compose(
    tree.unpack,
    search.multipleColumns({
      columns,
      query
    }),
    tree.pack
  )(rows);
}

// This picks only the length of the first query part.
function getQueryLength(query) {
  const keys =  Object.keys(query);

  return keys.length ? query[keys[0]].length : 0;
}

<TreeTable />
```
