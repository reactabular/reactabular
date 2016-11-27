Reactabular manages `colSpan` and `rowSpan` for you automatically by default. It is possible, however, to override these values if needed as the following example shows.

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
    position: {
      type: 'string'
    },
    salary: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'position', 'salary']
};

class CRUDTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: generateRows(20, schema), // initial rows
      columns: this.getColumns() // initial columns
    };
  }
  getColumns() {
    return [
      {
        props: {
          colSpan: 2, // It's possible to override rowSpan too
        },
        property: 'name',
        header: {
          label: 'Name'
        }
      },
      {
        property: 'position',
        header: {
          label: 'Position'
        }
      },
      {
        property: 'salary',
        header: {
          label: 'Salary'
        }
      }
    ];
  }
  render() {
    const { columns, rows } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<CRUDTable />
```
