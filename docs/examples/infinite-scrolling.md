The following example implements infinite scrolling within a fixed viewport.

```jsx
/*
import ReactDOM from 'react-dom';
import React from 'react';

import { generateData } from './helpers';
import {
  Table
} from 'reactabular';
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
const data = generateData(20, schema);

const columns = [
  {
    props: {
      style: { minWidth: 300, width: 300 }
    },
    header: {
      label: 'Name'
    },
    cell: {
      property: 'name'
    }
  },
  {
    props: {
      style: { minWidth: 100, width: 100 }
    },
    header: {
      label: 'Age'
    },
    cell: {
      property: 'age'
    }
  }
];

class InfiniteScrollingTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      columns
    };

    this.onBodyScroll = this.onBodyScroll.bind(this);
  }
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={this.state.columns}
        data={this.state.data}
        rowKey="id"
      >
        <Table.Header
          style={{
            display: 'block',
            overflow: 'auto',
            maxWidth: 800
          }}
        />

        <Table.Body
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
        data: this.state.data.concat(generateData(20, schema))
      });
    }
  }
}

<InfiniteScrollingTable />
```
