This is an example showing how to override default elements by components defined via the popular [styled components](https://styled-components.com/) library.

Assume we want to right-align all columns containing numbers and left-align the other columns. Styled components can be passed props as usual and we can achieve the desired formatting by defining a styled component `AlignedBodyCell` as shown in the example below.

In this example we have just set one css property, but one can imagine putting most or all the styling into such styling components.

```jsx
/*
import React from 'react';
import styled from 'styled-components';

import * as Table from 'reactabular-table';

import { generateRows } from './helpers';
*/

/* Number column is left aligned. Number less than 5000 is highlighted in red color */
const AlignedBodyCell = styled.td`
  text-align: ${props => props.isNumber ? 'right' : 'left'};
  color: ${props => props.isTinyNumber ? 'red' : 'black'};
`;

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

class AlignedTable extends React.Component {
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
        },
        cell: {
          transforms: [val => { return {isTinyNumber: val < 5000}; } ]
        },
        props: {
          isNumber: true, // the type information used for styling
        },
      }
    ];
  }
  render() {
    const { columns, rows } = this.state;

    const stylingRenderers = {
      body: {
        cell: AlignedBodyCell // the one element we are overriding
      }
    }

    return (
      <div>
        <Table.Provider
          renderers={stylingRenderers}
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

<AlignedTable />
```
