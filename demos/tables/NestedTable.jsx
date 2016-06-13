import React from 'react';
import {
  Table
} from '../../src';

const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John'
    },
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: false
  }
];

const columns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'dad',
    header: 'Dad',
    cell: (value) => {
      return 'id: ' + value.id + ', name: ' + value.name;
    },
  },
  {
    property: 'lovesBeeGees',
    header: 'Loves BeeGees',
    cell: (lovesBeeGees) =>
      lovesBeeGees ?
      <span>Loves BeeGees</span> :
      <span>Does not love BeeGees</span>
  }
];

const NestedTable = () => (
  <Table.Context className='pure-table pure-table-striped'
    columns={columns}
    data={data}>
    <Table.Header />

    <Table.Body rowKey='id' />
  </Table.Context>
);

export default NestedTable
