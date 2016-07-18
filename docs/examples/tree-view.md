This example shows you how to render trees using Reactabular. It relies on a flat and specifically ordered rows and a set of custom operations designed for it.

```jsx
/*
import React from 'react';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { Table, search, sort } from 'reactabular';

import { generateRows, Search, VisibilityToggles } from './helpers';
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

    this.state = {
      query: {},
      sortingColumns: null,
      rows,
      columns: this.getColumns()
    };

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
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });

    return [
      {
        props: {
          style: { width: 200 }
        },
        header: {
          label: 'Name',
          transforms: [sortable]
        },
        cell: {
          property: 'name',
          format: (name, { rowData }) => {
            const rows = this.state.rows;
            // Optimization - Operate based on index for faster lookups
            const cellIndex = findIndex(rows, { id: rowData.id });

            return (
              <div style={{ paddingLeft: `${getLevel(rows, cellIndex) * 1}em` }}>
                {hasChildren(rows, cellIndex) && <span
                  className={rowData.showChildren ? 'show-less' : 'show-more'}
                  onClick={e => {
                    rows[cellIndex].showChildren = !rowData.showChildren;

                    this.setState({ rows });
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
        props: {
          style: { width: 300 }
        },
        header: {
          label: 'Age',
          transforms: [sortable]
        },
        cell: {
          property: 'age'
        },
        visible: true
      }
    ];
  }
  render() {
    const { columns, sortingColumns, rows, query } = this.state;
    const cols = columns.filter(column => column.visible);
    const d = compose(
      filterTree,
      unpackTree,
      sort.sorter({ columns: cols, sortingColumns, sort: orderBy }),
      search.multipleColumns({ columns: cols, query }),
      packTree
    )(rows);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <div className="search-container">
          <span>Search</span>
          <Search
            columns={cols}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={cols}
        >
          <Table.Header />

          <Table.Body row={this.onRow} rows={d} rowKey="id" />
        </Table.Provider>
      </div>
    );
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

// Folds children inside root parents
function packTree(rows) {
  const ret = [];
  let pack = [];
  let previousParent;

  rows.forEach(row => {
    if (row.parent) {
      pack.push(row);
    } else {
      ret.push(row);

      if (previousParent && pack) {
        previousParent._pack = pack;

        pack = [];
      }

      previousParent = row;
    }
  });

  if (pack) {
    previousParent._pack = pack;
  }

  return ret;
}

// Extracts children from rows
function unpackTree(rows) {
  let ret = [];

  rows.forEach(row => {
    const { _pack, ...rest } = row;

    ret = ret.concat([rest]).concat(_pack);
  });

  return ret;
}

function generateParents(rows) {
  let previousParent;

  return rows.map(d => {
    const ret = {
      ...d,
      parent: previousParent
    };

    // Generate child instead of a sibling
    if (previousParent && Math.random() > 0.8) {
      // Do nothing
    } else if (Math.random() > 0.8) {
      // Back to root
      previousParent = null;
    } else {
      previousParent = d.id;
    }

    return ret;
  });
}

function filterTree(rows) {
  return rows.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(rows, i);

    return parents.filter(parent => parent.showChildren).length === parents.length;
  });
}

// This can be memoized for extra performance.
function getParents(rows, itemIndex) {
  const parents = [];
  let currentIndex = itemIndex;
  let cell = rows[itemIndex];
  let previousParent;
  let parentIndex;

  while (cell) {
    if (cell.id === previousParent) {
      parents.push(cell);

      if (!cell.parent) {
        break;
      }
    }

    if (cell.parent !== previousParent) {
      previousParent = cell.parent;
    }

    currentIndex--;

    cell = rows[currentIndex];
  }

  return parents;
}

// This can be memoized for extra performance.
function getLevel(rows, itemIndex) {
  // Get parent of parent till there is no parent -> level.
  // This relies on rows order!
  let level = 0;
  let currentIndex = itemIndex;
  let cell = rows[itemIndex];
  let previousParent;

  while (cell) {
    if (cell.parent) {
      if (previousParent !== cell.parent) {
        level++;
      }
    } else {
      break;
    }

    currentIndex--;

    previousParent = cell.parent;
    cell = rows[currentIndex];
  }

  return level;
}

// This can be memoized for extra performance.
function hasChildren(rows, itemIndex) {
  // See if the next item points to the current one.
  // This relies on rows order!
  const currentItem = rows[itemIndex];
  const nextItem = rows[itemIndex + 1];

  const ret = nextItem && currentItem.id === nextItem.parent;

  return ret;
}

<TreeTable />
```
