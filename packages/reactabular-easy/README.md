Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

To make the drag and drop functionality work, you have to set up [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) or some other React DnD backend.

```jsx
/*
import React from 'react';
import EasyTable from 'reactabular-easy';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import cloneDeep from 'lodash/cloneDeep';

import { generateRows, VisibilityToggles } from './helpers';
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
    },
    boss: {
      $ref: '#/definitions/boss'
    }
  },
  required: ['id', 'age', 'boss'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};
const rows = generateRows(30, schema);

const columns = [
  {
    header: {
      label: 'Name',
      draggable: true,
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'name',
      highlight: true
    },
    width: 200,
    visible: true
  },
  {
    header: {
      label: 'Age',
      draggable: true,
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'age',
      highlight: true
    },
    width: 100,
    visible: true
  },
  {
    header: {
      label: 'Boss',
      draggable: true,
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'boss.name',
      highlight: true
    },
    width: 200,
    visible: false
  },
  {
    header: {
      resizable: true
    },
    cell: {
      format: (value, { rowData }) => (
        <input
          type="button"
          value="Click me"
          onClick={() => alert(`${JSON.stringify(rowData, null, 2)}`)}
        />
      )
    },
    width: 200,
    visible: true
  }
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns,
      query: {}
    };

    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  render() {
    const { columns, query } = this.state;
    const cols = this.state.columns.filter(column => column.visible);

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

        <EasyTable
          rows={rows}
          rowKey="id"
          tableWidth={800}
          tableHeight={400}
          columns={cols}
          query={query}
          classNames={{
            table: {
              wrapper: 'pure-table pure-table-striped'
            }
          }}
          onDragColumn={this.onDragColumn}
          onMoveColumns={this.onMoveColumns}
          onRow={this.onRow}
        />
      </div>
    );
  }
  onDragColumn(width, columnIndex) {
    console.log('onDragColumn', width, columnIndex);
  }
  onMoveColumns(columns) {
    console.log('onMoveColumns', columns);
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

const DragAndDropDemo = DragDropContext(HTML5Backend)(Demo);

<DragAndDropDemo />
```
