import React from 'react';
import { Page, ReactSpecimen } from 'catalog';
import {
  Table,
} from '../../src';

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
  <Page>
    <h2><code>Table.Header</code></h2>

    <p>
      <code>Table.Header</code> renders a table header within a <code>Table</code> context.
    </p>

    <hr />

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header />

        <Table.Body />

        <Table.Header />
      </Table>
    </ReactSpecimen>
  </Page>
);
