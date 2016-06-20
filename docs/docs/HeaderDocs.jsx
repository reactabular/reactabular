/* eslint-disable no-console, max-len */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../components';
import {
  Table,
} from '../../src';
import {
  ColumnFilters,
} from '../components';

const data = [
  {
    id: 100,
    name: 'Adam',
  },
  {
    id: 101,
    name: 'Brian',
  },
];

const columns = [
  {
    property: 'name',
    header: 'Name',
  },
];

export default () => (
  <CustomPage>
    <h2><code>Table.Header</code></h2>

    <p>
      <code>Table.Header</code> renders a table header within a <code>Table</code> context.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />

        <Table.Header />
      </Table>
    </ReactSpecimen>

    <h2>Customizing <code>Table.Header</code></h2>

    <p>
      It is possible to customize a header by passing child components to it. This way you can implement filtering per column for instance.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header>
          <ColumnFilters
            columns={columns}
            onChange={value => console.log('new value', value)}
          />
        </Table.Header>

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>
  </CustomPage>
);
