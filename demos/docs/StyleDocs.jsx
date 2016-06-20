/* eslint-disable no-console, max-len, react/prop-types */
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
];

const columns = [
  {
    property: 'name',
    header: 'Name',
    cell: ({ value }) => <span className="demo-cell">{value}</span>,
  },
];

export default () => (
  <CustomPage>
    <p>
      Reactabular doesn't force you to style in any particular way. Instead, it provides enough flexibility for you to attach styling hooks to it as you see fit.
    </p>

    <p>
      The project root contains a file, <code>style.css</code>, which you can import to your project. It sets styles related to sorting. It can be a good idea to use predefined styles like the ones provided by <a href="http://purecss.io/">Pure.css</a> to save some effort.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
      >
        <Table.Header className="header" />

        <Table.Body
          rowKey="id"
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row',
          })}
        />
      </Table>
    </ReactSpecimen>
  </CustomPage>
);
