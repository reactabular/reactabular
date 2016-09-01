`reactabular-tree` provides tree helpers for Reactabular. To get children folding work, you should include default styling (`style.css`) to your project.

**Example:**

```jsx
/*
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { compose } from 'redux';
import {
  Table, search, Search, sort, resolve
} from 'reactabular';
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

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    const columns = this.getColumns();
    const rows = resolve.resolve(
      {
        columns,
        method: resolve.index
      }
    )(
      generateParents(generateRows(100, schema))
    );

    this.state = {
      searchColumn: 'all',
      query: {},
      sortingColumns: null,
      rows,
      columns
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
        const sortingColumns = sort.byColumns({
          sortingColumns: this.state.sortingColumns,
          selectedColumn
        });

        this.setState({ sortingColumns });
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
          format: tree.toggleChildren({
            getRows: () => this.state.rows,
            getShowingChildren: ({ rowData }) => rowData.showingChildren,
            toggleShowingChildren: rowIndex => {
              const rows = cloneDeep(this.state.rows);

              rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;

              this.setState({ rows });
            }
          })
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
      searchColumn, columns, sortingColumns, query
    } = this.state;
    const visibleColumns = columns.filter(column => column.visible);
    const rows = compose(
      tree.filter('showingChildren'),
      tree.sort({
        columns,
        sortingColumns
      }),
      tree.search({ columns, query })
    )(this.state.rows);

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

          <Table.Body
            onRow={this.onRow}
            rows={rows}
            rowKey="id"
          />
        </Table.Provider>
      </div>
    );
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
  onRow(row, { rowIndex }) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
}

<TreeTable />
```
