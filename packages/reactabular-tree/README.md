`reactabular-tree` provides tree helpers for Reactabular. It relies on a flat structure like this:

```javascript
const tree = [
  {
    id: 123,
    name: 'Demo'
  },
  {
    id: 456,
    name: 'Another',
    parent: 123
  },
  {
    id: 789,
    name: 'Yet Another',
    parent: 123
  },
  {
    id: 532,
    name: 'Foobar'
  }
];
```

If there's a `parent` relation, the children must follow their parent right after it.

> You can find suggested default styling for the package at `style.css` in the package root.

## API

### Transformations

**`tree.collapseAll = (rows, property = 'showingChildren') => <collapsedRows>`**

Collapses rows by setting `showingChildren` of each row to `false`.

**`tree.expandAll = (rows, property = 'showingChildren') => <expandedRows>`**

Expands rows by setting `showingChildren` of each row to `true`.

**`tree.filter = (fieldName) => (rows) => filteredRows`**

Filters the given rows using `fieldName`. This is handy if you want only rows that are visible assuming visibility logic has been defined.

**`tree.flatten = ({ tree, parentField = 'parent', parent, idField = 'id'}) => <flattenedRows>`**

Flattens a nested tree structure into a flat one compatible with the algorithms.

### Queries

**`tree.getLevel = ({ rows, index, parent = 'parent' }) => <level>`**

Returns the nesting level of the row at the given `index` within `rows`.

**`tree.getParents = ({ rows, index, parent = 'parent' }) => [<parent>]`**

Returns parents based on given `rows` and `index`.

**`tree.hasChildren = ({ rows, index, id = 'id', parent = 'parent '}) => <boolean>`**

Returns a boolean based on whether or not the row at the given `index` has children.

**`tree.search = ({ columns, query }) => (rows) => <searchedRows>`**

Allows you to search against a tree structure (packs/unpacks internally).

**`tree.sort = ({ columns, sortingColumns, strategy }) => (rows) => <sortedRows>`**

Allows you to sort a tree (packs/unpacks internally).

### Packing

**`tree.pack = ({ parent = 'parent' }) => (rows) => <packedRows>`**

Packs children inside root level nodes. This is useful with sorting and filtering.

**`tree.unpack = (rows) => <unpackedRows>`**

Unpacks children from root level nodes. This is useful with sorting and filtering.

### UI

**`tree.toggleChildren = ({ getRows, getShowingChildren, toggleShowingChildren, props, id, parent }) => (value, extra) => <React element>`**

Makes it possible to toggle node children through a user interface.

## Example

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

    this.onExpandAll = this.onExpandAll.bind(this);
    this.onCollapseAll = this.onCollapseAll.bind(this);
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
            },
            // inject custom class name per row here etc.
            props: {}
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

        <button onClick={this.onExpandAll}>Expand all</button>
        <button onClick={this.onCollapseAll}>Collapse all</button>

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

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
  onExpandAll() {
    this.setState({
      rows: tree.expandAll(this.state.rows)
    });
  }
  onCollapseAll() {
    this.setState({
      rows: tree.collapseAll(this.state.rows)
    });
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

<TreeTable />
```
