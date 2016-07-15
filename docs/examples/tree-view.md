This example shows you how to render trees using Reactabular. It relies on a flat and specifically ordered data and a set of custom operations designed for it.

```jsx
/*
import React from 'react';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { Table, search, sort } from 'reactabular';

import { generateData, Search } from './helpers';
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
const data = generateParents(generateData(100, schema));

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {},
      sortingColumns: null,
      data,
      columns: this.getColumns()
    };
  }
  getColumns() {
    const sortable = sort.sort({
      // Point the transform to your data. React state can work for this purpose
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
            const data = this.state.data;
            // Optimization - Operate based on index for faster lookups
            const cellIndex = findIndex(data, { id: rowData.id });

            return (
              <div style={{ paddingLeft: `${getLevel(data, cellIndex) * 1}em` }}>
                {hasChildren(data, cellIndex) && <span
                  className={rowData.showChildren ? 'show-less' : 'show-more'}
                  onClick={e => {
                    data[cellIndex].showChildren = !rowData.showChildren;

                    this.setState({ data });
                  }}
                />}
                {name}
              </div>
            );
          }
        }
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
        }
      }
    ];
  }
  render() {
    const { columns, sortingColumns, data, query } = this.state;
    const d = compose(
      filterTree,
      unpackTree,
      sort.sorter({ columns, sortingColumns, sort: orderBy }),
      search.multipleColumns({ columns, query }),
      packTree
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

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          data={d}
          rowKey="id"
        >
          <Table.Header />

          <Table.Body row={this.onRow} />
        </Table.Provider>
      </div>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
}

// Folds children inside root parents
function packTree(data) {
  const ret = [];
  let pack = [];
  let previousParent;

  data.forEach(row => {
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

// Extracts children from data
function unpackTree(data) {
  let ret = [];

  data.forEach(row => {
    const { _pack, ...rest } = row;

    ret = ret.concat([rest]).concat(_pack);
  });

  return ret;
}

function generateParents(data) {
  let previousParent;

  return data.map(d => {
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

function filterTree(data) {
  return data.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(data, i);

    return parents.filter(parent => parent.showChildren).length === parents.length;
  });
}

// This can be memoized for extra performance.
function getParents(data, itemIndex) {
  const parents = [];
  let currentIndex = itemIndex;
  let cell = data[itemIndex];
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

    cell = data[currentIndex];
  }

  return parents;
}

// This can be memoized for extra performance.
function getLevel(data, itemIndex) {
  // Get parent of parent till there is no parent -> level.
  // This relies on data order!
  let level = 0;
  let currentIndex = itemIndex;
  let cell = data[itemIndex];
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
    cell = data[currentIndex];
  }

  return level;
}

// This can be memoized for extra performance.
function hasChildren(data, itemIndex) {
  // See if the next item points to the current one.
  // This relies on data order!
  const currentItem = data[itemIndex];
  const nextItem = data[itemIndex + 1];

  const ret = nextItem && currentItem.id === nextItem.parent;

  return ret;
}

<TreeTable />
```
