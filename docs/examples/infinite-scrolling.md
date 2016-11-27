The following example implements infinite scrolling within a fixed viewport.

```jsx
/*
import React from 'react';
import * as Table from 'reactabular-table';
import { generateRows } from './helpers';
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
const rows = generateRows(20, schema);

const columns = [
  {
    property: 'name',
    props: {
      style: { minWidth: 300, width: 300 }
    },
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    props: {
      style: { minWidth: 100, width: 100 }
    },
    header: {
      label: 'Age'
    }
  }
];

class InfiniteScrollingTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns
    };

    this.onBodyScroll = this.onBodyScroll.bind(this);
  }
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={this.state.columns}
      >
        <Table.Header
          style={{
            display: 'block',
            overflow: 'auto',
            maxWidth: 800
          }}
        />

        <Table.Body
          rows={this.state.rows}
          rowKey="id"
          style={{
            display: 'block',
            overflow: 'auto',
            maxHeight: 400,
            maxWidth: 800
          }}
          onScroll={this.onBodyScroll}
        />
      </Table.Provider>
    );
  }
  onBodyScroll({ target: { scrollHeight, scrollTop, offsetHeight } }) {
    if (scrollTop + offsetHeight === scrollHeight) {
      this.setState({
        rows: this.state.rows.concat(generateRows(20, schema))
      });
    }
  }
}

<InfiniteScrollingTable />
```
