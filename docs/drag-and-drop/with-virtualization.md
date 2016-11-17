The following example shows how to integrate drag and drop with virtualization.

**Example:**

```jsx
/*
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { Table, resolve } from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';

import { generateRows } from './helpers';
*/

const columns = [
  {
    props: {
      style: { minWidth: 50 }
    },
    header: {
      label: 'Index'
    },
    cell: {
      format: (value, { rowIndex }) => <span>{rowIndex}</span>
    }
  },
  {
    property: 'name',
    props: {
      style: { minWidth: 300 }
    },
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    props: {
      style: { minWidth: 100 }
    },
    header: {
      label: 'Age'
    }
  },
  {
    property: 'company',
    props: {
      style: { minWidth: 400 }
    },
    header: {
      label: 'Company'
    }
  },
  {
    property: 'product',
    props: {
      style: { minWidth: 400 }
    },
    header: {
      label: 'Product'
    }
  }
];

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    product: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'product', 'company', 'age']
};
// Resolving indices is an optional step. You can skip it if you don't
// rely on rowIndex anywhere. But if you do, it's good to calculate and
// include to the data. Reactabular's rendering logic is able to pick it
// up by convention (`_index` field).
const rows = resolve.resolve({
  columns,
  method: resolve.index
})(generateRows(1000, schema));

class VirtualizedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns,
      scroll: {}
    };

    this.onScroll = this.onScroll.bind(this);
    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
  }
  render() {
    const { rows, scroll } = this.state;

    return (
      <div>
        <Sticky.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          components={{
            body: {
              wrapper: Virtualized.BodyWrapper,
              row: dnd.draggableRow(Virtualized.BodyRow)
            }
          }}
          onScroll={this.onScroll}
        >
          <Sticky.Header
            style={{
              maxWidth: 800
            }}
            scroll={scroll}
          />

          <Virtualized.Body
            rows={rows}
            rowKey="id"
            style={{
              maxWidth: 800
            }}
            height={400}
            onRow={this.onRow}
            scroll={scroll}
          />
        </Sticky.Provider>
      </div>
    );
  }
  onScroll(scroll) {
    this.setState({ scroll });
  }
  onRow(row) {
    return {
      rowId: row.id,
      onMove: this.onMoveRow
    };
  }
  onMoveRow({ sourceRowId, targetRowId }) {
    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);

    if (rows) {
      this.setState({ rows });
    }
  }
}

<VirtualizedTable />
```
