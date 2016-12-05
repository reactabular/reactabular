Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

## How to Use?

To make the drag and drop functionality work, you have to set up [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) or some other React DnD backend.

> You can find suggested default styling for the package at `style.css` in the package root.

> If you want to use the drag and drop functionality, you have to set up React DnD!

```jsx
/*
import React from 'react';
import { resolve } from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as easy from 'reactabular-easy';
import VisibilityToggles from 'react-visibility-toggles';
import * as resizable from 'reactabular-resizable';
import * as tree from 'treetabular';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { compose } from 'redux';
import uuid from 'uuid';
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
  required: ['Id', 'fullName', 'company', 'age', 'boss'],
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
      query: {},
      hiddenColumns: {} // <id>: <hidden> - show all by default
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
  componentWillMount() {
    this.resizableHelper = resizable.helper({
      globalId: uuid.v4(),
      getId: ({ id }) => id
    });
  }
  componentWillUnmount() {
    this.resizableHelper.cleanup();
  }
  getColumns() {
    return [
      {
        id: 'demo', // Unique ids for handling visibility checks
        header: {
          label: 'Demo',
          draggable: true,
          resizable: true,
          formatters: [
            () => <span>Testing</span>
          ]
        },
        cell: {
          formatters: [
            () => <span>Demo</span>,
          ],
          toggleChildren: true
        },
        width: 100
      },
      {
        id: 'name',
        header: {
          label: 'Name'
          // Disabled for now as this is a difficult case in React DnD
          //draggable: true
        },
        children: [
          {
            id: 'firstName',
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
            id: 'lastName',
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
        id: 'age',
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
        width: 150
      },
      {
        id: 'company',
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
        width: 250
      },
      {
        id: 'bossName',
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
        width: 200
      },
      {
        cell: {
          formatters: [
            (value, { rowData }) => (
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
          ]
        },
        width: 200
      }
    ];
  }
  render() {
    const {
      columns, sortingColumns, rows, query, hiddenColumns
    } = this.state;
    const idField = 'Id';
    const parentField = 'parent';

    const visibleColumns = compose(
      // 5. Patch columns with classNames for resizing
      this.resizableHelper.initialize,
      // 4. Bind columns (extra functionality)
      easy.bindColumns({
        toggleChildrenProps: { className: 'toggle-children' },
        sortingColumns,
        rows,
        idField,
        parentField,
        props: this.props,

        // Handlers
        onMoveColumns: this.onMoveColumns,
        onSort: this.onSort,
        onDragColumnStart: (width, extra) => console.log('drag column start', width, extra),
        onDragColumn: this.onDragColumn,
        onDragColumnEnd: (width, extra) => console.log('drag column end', width, extra),
        onToggleShowingChildren: this.onToggleShowingChildren
      }),
      // 3. Filter based on visibility again (children level)
      columns => columns.filter(column => !hiddenColumns[column.id]),
      // 2. Unpack
      tree.unpack(),
      // 1. Filter based on visibility (root level)
      columns => columns.filter(column => !hiddenColumns[column.id])
    )(columns);
    const columnChildren = visibleColumns.filter(column => !column._isParent);
    const headerRows = resolve.headerRows({
      columns: tree.pack()(visibleColumns)
    });

    return (
      <div>
        <VisibilityToggles
          columns={tree.unpack()(columns)}
          onToggleColumn={this.onToggleColumn}
          isVisible={({ id }) => !hiddenColumns[id]}
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
          <search.Field
            query={query}
            columns={columnChildren}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>

        <easy.Table
          ref={table => {
            this.table = table
          }}
          rows={rows}
          headerRows={headerRows}
          rowKey="Id"
          sortingColumns={sortingColumns}
          tableWidth={800}
          tableHeight={400}
          columns={columnChildren}
          query={query}
          classNames={{
            table: {
              wrapper: 'pure-table pure-table-striped'
            }
          }}
          headerExtra={
            <search.Columns
              query={query}
              columns={columnChildren}
              onChange={query => this.setState({ query })}
            />
          }

          idField={idField}
          parentField={parentField}

          onMoveRow={this.onMoveRow}
          onSelectRow={this.onSelectRow}
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
  onDragColumn(width, { column }) {
    this.resizableHelper.update({
      column,
      width
    });
  }
  onMoveColumns({ sourceLabel, targetLabel }) {
    const columns = tree.unpack()(this.state.columns);

    const sourceIndex = findIndex(
      columns,
      { header: { label: sourceLabel } }
    );
    const targetIndex = findIndex(
      columns,
      { header: { label: targetLabel } }
    );

    if (sourceIndex < 0 || targetIndex < 0) {
      return null;
    }

    let source = columns[sourceIndex];
    let target = columns[targetIndex];

    if (source._isParent) {
      return console.warn(
        'Dragging parents is not supported yet'
      );
    }

    // If source doesn't have a parent, make sure we are dragging to
    // target parent by modifying the original structure.
    if (!source.parent) {
      const targetParents = tree.getParents({
        index: findIndex(columns, { id: target.id })
      })(columns);

      // If trying to drag to a child, drag to its root
      // parent instead.
      if (targetParents.length) {
        return console.warn(
          'Dragging to a nested column is not supported yet'
        );
      }

      const nestedSourceIndex = findIndex(
        this.state.columns,
        { header: { label: sourceLabel } }
      );
      source = this.state.columns[nestedSourceIndex];

      const nestedTargetIndex = findIndex(
        this.state.columns,
        { header: { label: target.header.label } }
      );
      target = this.state.columns[nestedTargetIndex];

      if (nestedSourceIndex < 0 || nestedTargetIndex < 0) {
        return null;
      }

      // We are operating at root level now so move accordingly.
      const movedColumns = dnd.move(
        this.state.columns, nestedSourceIndex, nestedTargetIndex
      );

      // Retain widths while moving
      movedColumns[nestedSourceIndex].width = source.width;
      movedColumns[nestedTargetIndex].width = target.width;

      this.setState({
        columns: movedColumns
      });
    } else if (source.parent === target.parent) {
      // Dragging within children now. This has to be against flattened data.
      const movedColumns = dnd.move(columns, sourceIndex, targetIndex);

      // Retain widths while moving.
      // XXX: This works only for single level nesting.
      const sourceWidth = source.width;
      const targetWidth = target.width;

      source.width = targetWidth;
      target.width = sourceWidth;

      this.setState({
        columns: tree.pack()(movedColumns)
      });
    }
    // If trying to drag from children to other children or so, do nothing.
  }
  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow);
  }
  onSort(sortingColumns) {
    console.log('onSort', sortingColumns);

    this.setState({ sortingColumns });
  }
  onToggleColumn({ column }) {
    const { hiddenColumns } = this.state;

    this.setState({
      hiddenColumns: {
        ...hiddenColumns,
        [column.id]: !hiddenColumns[column.id]
      }
    });
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
