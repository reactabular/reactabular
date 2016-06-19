/* eslint-disable no-console, no-alert, no-unused-vars, react/prop-types */
import React from 'react';
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

const NestedTable = () => (
  <Table
    className="pure-table pure-table-striped"
    columns={columns}
    data={data}
  >
    <Table.Header />

    <Table.Body rowKey="id" />
  </Table>
);

export default NestedTable;
