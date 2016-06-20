import React from 'react';
import { Page, ReactSpecimen } from 'catalog';
import {
  Table,
} from '../../src';

const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John',
    },
    lovesBeeGees: true,
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George',
    },
    lovesBeeGees: false,
  },
];

const columns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'dad.name',
    header: 'Dad',
  },
  {
    property: 'lovesBeeGees',
    header: 'Loves BeeGees',
    cell: ({ value }) => (
      <span>
        {value ? 'Loves BeeGees' : 'Does not love BeeGees'}
      </span>
    ),
  },
];

export default () => (
  <Page>
    <h2><code>Table</code></h2>

    <p>
      <code>Table</code> is the core of Reactabular. It sets up a <a href="https://facebook.github.io/react/docs/context.html">context and maps <code>column</code> and <code>data</code> definitions to its children components.</a>
    </p>

    <hr />

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>
  </Page>
);
