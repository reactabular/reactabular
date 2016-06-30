/* eslint-disable no-shadow */
import React from 'react';
import { Table } from '../../src';

export default class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          header: {
            label: 'Name',
            props: {
              style: {
                width: 200
              }
            }
          },
          cell: {
            property: 'name',
            props: {
              style: {
                width: 200
              }
            }
          }
        },
        {
          header: {
            label: 'Address',
            props: {
              style: {
                width: 300
              }
            }
          },
          cell: {
            property: 'address',
            props: {
              style: {
                width: 300
              }
            }
          }
        }
      ],
      data: [
        {
          id: 1,
          name: 'This is a very long title that goes on and on',
          address: '85 Peachfield Road'
        },
        {
          id: 2,
          name: 'Here is a shorter one',
          address: '77 Newmarket Road'
        }
      ]
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Table columns={columns} data={data} rowKey="id">
        <Table.Header />

        <Table.Body />
      </Table>
    );
  }
}
