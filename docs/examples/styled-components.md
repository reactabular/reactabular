This is a simple example showing how to override default elements by components defined via the popular [styled components](https://styled-components.com/) library.

Assume we want to right-align all columns containing numbers and left-align the other columns. Styled components can be passed props as usual, so if we define a styled component as follows:

```jsx
import styled from 'styled-components';

const AlignedBodyCell = styled.td`
  text-align: ${props => props.isNumber ? 'right' : 'left'};
`;

export default AlignedBodyCell;
```

and the column definition contains the `isNumber` information, we can apply the desired styling like this:

```jsx
/*
import React from 'react';
import * as Table from 'reactabular-table';

import { generateRows } from './helpers';

import AlignedBodyCell from './AlignedBodyCell';
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
        props: {
          isNumber: true, // the type information used for styling
        },
      }
    ];
  }
  render() {
    const { columns, rows } = this.state;

    const stylingComponents = {
      body: {
        cell: AlignedBodyCell // the one element we are overriding
      }
    }

    return (
      <div>
        <Table.Provider
          components={stylingComponents}
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

export default AlignedTable
```

In this example we have just set one css property, but one can imagine putting most or all the styling into such styling components.