/* eslint-disable no-console, no-alert, no-shadow, no-unused-vars, react/prop-types */
import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import range from 'lodash/range';
import jsf from 'json-schema-faker';

import {
  Table
} from '../../src';

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid'
    },
    name: {
      type: 'string',
      faker: 'name.findName'
    },
    product: {
      type: 'string',
      faker: 'commerce.product'
    },
    company: {
      type: 'string',
      faker: 'company.companyName'
    },
    age: {
      $ref: '#/definitions/age'
    }
  },
  required: ['id', 'name', 'product', 'company', 'age'],
  definitions: {
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
      exclusiveMinimum: true
    }
  }
};
const data = range(100).map(() => jsf(schema));

export default class StickyHeaderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      columns: this.getColumns()
    };
  }
  getColumns() {
    return [
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
      },
      {
        props: {
          style: { minWidth: 400, width: 400 }
        },
        header: {
          label: 'Company'
        },
        cell: {
          property: 'company'
        }
      },
      {
        props: {
          style: { minWidth: 400, width: 400 }
        },
        header: {
          label: 'Product'
        },
        cell: {
          property: 'product'
        }
      }
    ];
  }
  render() {
    return (
      <Table
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
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row'
          })}
        />
      </Table>
    );
  }
}
