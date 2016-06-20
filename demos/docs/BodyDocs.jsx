/* eslint-disable no-console, max-len, quotes */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../components';
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
  {
    id: 102,
    name: 'Jake',
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
    <h2><code>Table.Body</code></h2>

    <p>
      <code>Table.Body</code> renders a table data within a <code>Table</code> context.
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

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>

    <h2>Customizing <code>Table.Body</code> Rows</h2>

    <p>
      It is possible to customize body behavior on a row level. <code>row</code> prop accepts function <code>{`(row, rowIndex) => ({...})`}</code> that allows you to set custom attributes per each row.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header />

        <Table.Body
          rowKey="id"
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row',
            onClick: () => console.log('clicked row', row),
          })}
        />
      </Table>
    </ReactSpecimen>
  </CustomPage>
);
