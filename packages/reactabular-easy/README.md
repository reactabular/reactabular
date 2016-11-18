Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

## How to Use?

To make the drag and drop functionality work, you have to set up [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) or some other React DnD backend.

> You can find suggested default styling for the package at `style.css` in the package root.

> If you want to use the drag and drop functionality, you have to set up React DnD!

```jsx
/*
import React from 'react';
import { search, Search, SearchColumns } from 'reactabular';
import { getColumnByPath } from 'reactabular-utils';
import EasyTable from 'reactabular-easy';
import VisibilityToggles from 'reactabular-visibility-toggles';
import * as tree from 'reactabular-tree';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';

import {
  generateParents, generateRows
} from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    Id: {
      type: 'string'
    },
    fullName: {
      $ref: '#/definitions/fullName'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    boss: {
      $ref: '#/definitions/boss'
    }
  },
  required: ['Id', 'name', 'company', 'age', 'boss', 'fullName'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string'
        },
        last: {
          type: 'string'
        }
      },
      required: ['first', 'last']
    }
  }
};
const rows = generateParents(generateRows(200, schema), 'Id');

class EasyDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns: this.getColumns(),
      sortingColumns: {},
      query: {}
    };
    this.table = null;

    this.onMoveRow = this.onMoveRow.bind(this);
    this.onDragColumn = this.onDragColumn.bind(this);
    this.onMoveColumns = this.onMoveColumns.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onToggleShowingChildren = this.onToggleShowingChildren.bind(this);
  }
  getColumns() {
    return [
      {
        header: {
          label: 'Demo',
          draggable: true,
          resizable: true,
          format: () => <span>Testing</span>
        },
        cell: {
          format: () => <span>Demo</span>,
          toggleChildren: true
        },
        width: 100,
        visible: true
      },
      {
        // property: 'name',
        header: {
          label: 'Name',
          draggable: true,
          //sortable: true,
          //resizable: true
        },
        cell: {
          highlight: true
        },
        // width: 250,
        // minWidth: 100,
        visible: true,
        children: [
          {
            property: 'fullName.first',
            header: {
              label: 'First Name',
              draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          highlight: true
        },
            width: 125
          },
          {
            property: 'fullName.last',
            header: {
              label: 'Last Name',
              draggable: true,
              sortable: true,
              resizable: true
            },
            cell: {
              highlight: true
            },
            width: 125
          }
        ]
      },
      {
        property: 'age',
        header: {
          label: 'Age',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          highlight: true
        },
        width: 150,
        visible: true
      },
      {
        property: 'company',
        header: {
          label: 'Company',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          highlight: true
        },
        width: 250,
        visible: true
      },
      {
        property: 'boss.name',
        header: {
          label: 'Boss',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          highlight: true
        },
        width: 200,
        visible: false
      },
      {
        cell: {
          format: (value, { rowData }) => (
            <div>
              <input
                type="button"
                value="Click me"
                onClick={() => alert(`${JSON.stringify(rowData, null, 2)}`)}
              />
              <span
                className="remove"
                onClick={() => this.onRemove(rowData.Id)}
                style={{ marginLeft: '1em', cursor: 'pointer' }}
              >
                &#10007;
              </span>
            </div>
          )
        },
        width: 200,
        visible: true
      }
    ];
  }
  render() {
    const { columns, sortingColumns, rows, query } = this.state;
    const visibleColumns = this.state.columns.filter(column => column.visible);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <div className="scroll-container">
          <label>Scroll to index: </label>
          <div>
            <input
              type="text"
              onChange={e => this.table.tableBody.scrollTo(e.target.value)}
            />
          </div>
        </div>

        <div className="search-container">
          <span>Search</span>
          <Search
            query={query}
            columns={visibleColumns}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>

        <EasyTable
          ref={table => {
            this.table = table
          }}
          rows={rows}
          rowKey="Id"
          sortingColumns={sortingColumns}
          tableWidth={800}
          tableHeight={400}
          columns={visibleColumns}
          query={query}
          classNames={{
            table: {
              wrapper: 'pure-table pure-table-striped'
            }
          }}
          headerExtra={
            <SearchColumns
              query={query}
              columns={visibleColumns}
              onChange={query => this.setState({ query })}
            />
          }
          toggleChildrenProps={{ className: 'toggle-children' }}

          idField="Id"
          parentField="parent"

          onMoveRow={this.onMoveRow}
          onDragColumn={this.onDragColumn}
          onMoveColumns={this.onMoveColumns}
          onSelectRow={this.onSelectRow}
          onSort={this.onSort}
          onToggleShowingChildren={this.onToggleShowingChildren}
        />
      </div>
    );
  }
  onMoveRow({ sourceRowId, targetRowId }) {
    const rows = tree.moveRows({
      sourceRowId,
      targetRowId,
      idField: 'Id', // Defaults to id
      parentField: 'parent'
    })(this.state.rows);

    rows && this.setState({ rows });
  }
  onDragColumn(width, { columnPath }) {
    const columns = cloneDeep(this.state.columns);

    getColumnByPath(columns, columnPath).width = width;

    this.setState({ columns });
  }
  onMoveColumns({ columns, source, target }) {
    this.setState({ columns });
  }
  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow);
  }
  onSort(sortingColumns) {
    console.log('onSort', sortingColumns);

    this.setState({ sortingColumns });
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
  onRemove(id) {
    const rows = cloneDeep(this.state.rows);
    const idx = findIndex(rows, { Id });

    // this could go through flux etc.
    rows.splice(idx, 1);

    this.setState({ rows });
  }
  onToggleShowingChildren(rowIndex) {
    const rows = cloneDeep(this.state.rows);

    rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;

    this.setState({ rows });
  //},
  }
}

// Set up drag and drop context
// const DragAndDropDemo = DragDropContext(HTML5Backend)(Demo);

<EasyDemo />
```

## Styling

It is possible to pass custom `classNames` and `props` as listed below:

```js
classNames: {
  table: null,
  header: {
    wrapper: null
    // TODO
    /*
    row: null,
    cell: null
    */
  },
  body: {
    wrapper: null
    // TODO
    /*
    row: null,
    cell: null
    */
  }
},
props: {
  resize: {
    container: {
      style: {
        color: 'red'
      }
    },
    value: {},
    handle: {}
  },
  sort: {
    container: {},
    value: {},
    order: {}
  }
}
```

For more control, you can also override `components` and also inject styling and class names through the column definition and the `onRow` handler.

## Customization

If you want to customize resize/sort controls further (add `className`s etc.), pass `props` like this:

```javascript
props: {
  resize: {
    container: {},
    value: {},
    handle: {}
  },
  sort: {
    container: {},
    value: {},
    order: {}
  }
},
```
