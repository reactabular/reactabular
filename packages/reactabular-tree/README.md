`reactabular-tree` provides tree helpers for Reactabular.

**Example:**

```jsx
/*
import React from 'react';
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

    this.state = {
      searchColumn: 'all',
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
            const rows = this.state.rows;
            const cellIndex = rowData._index;

            return (
              <div style={{ paddingLeft: `${tree.getLevel(rows, cellIndex) * 1}em` }}>
                {tree.hasChildren(rows, cellIndex) && <span
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
    const { searchColumn, columns, sortingColumns, rows, query } = this.state;
    const visibleColumns = columns.filter(column => column.visible);
    const d = compose(
      tree.filter,
      tree.unpack,
      sort.sorter({
        columns: visibleColumns,
        sortingColumns,
        sort: orderBy
      }),
      search.multipleColumns({
        columns: visibleColumns,
        query
      }),
      tree.pack,
      resolve.resolve(
        {
          columns: visibleColumns,
          method: resolve.index
        }
      )
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
            column={searchColumn}
            query={query}
            columns={visibleColumns}
            rows={rows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={visibleColumns}
        >
          <Table.Header />

          <Table.Body onRow={this.onRow} rows={d} rowKey="id" />
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

<TreeTable />
```
