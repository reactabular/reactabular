/* eslint-disable no-shadow */
import React from 'react';
import { Table } from '../../src';

const columns = [
  {
    header: {
      label: 'Color'
    },
    cell: {
      property: 'color'
    }
  },
  {
    header: {
      label: 'Name'
    },
    children: [
      {
        header: {
          label: 'First Name'
        },
        cell: {
          property: 'name.first'
        }
      },
      {
        header: {
          label: 'Last Name'
        },
        cell: {
          property: 'name.last'
        }
      }
    ]
  },
  {
    header: {
      label: 'About'
    },
    children: [
      {
        header: {
          label: 'Company'
        },
        cell: {
          property: 'company'
        }
      },
      {
        header: {
          label: 'Sentence'
        },
        cell: {
          property: 'sentence'
        }
      }
    ]
  }
];

const data = [
  {
    id: 1,
    color: 'red',
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    color: 'blue',
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  }
];

const NestedHeadersTable = () => (
  <Table.Provider columns={columns} data={data} rowKey="id">
    <Table.Header />

    <Table.Body />
  </Table.Provider>
);

export default NestedHeadersTable;
