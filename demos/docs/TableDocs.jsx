/* eslint-disable max-len, react/prop-types */
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

const simpleColumns = [
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

const nestedColumns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'dad.name',
    header: 'Dad',
  },
];

const customizedColumns = [
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
  <CustomPage>
    <h2><code>Table</code></h2>

    <p>
      <code>Table</code> is the core of Reactabular. It sets up a <a href="https://facebook.github.io/react/docs/context.html">context</a> and maps <code>column</code> and <code>data</code> definitions to its children components.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={simpleColumns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>

    <h2>Accessing Nested <code>Table</code> Data</h2>

    <p>
      <code>Table</code> allows you to access nested data through a dot notation.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={nestedColumns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>

    <h2>Customizing <code>Table</code> Cells</h2>

    <p>
      <code>Table</code> cell rendering can be customized through the column definition. It accepts a <code>cell</code> handler that should return a structure compatible with React.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={customizedColumns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    </ReactSpecimen>

    <h2>Customizing <code>Table</code> Footer</h2>

    <p>
      Thanks to the <code>Table</code> it is possible to inject a custom footer easily.
    </p>

    <ReactSpecimen span={6}>
      <Table
        className="pure-table pure-table-striped"
        columns={customizedColumns}
        data={data}
      >
        <Table.Header />

        <Table.Body rowKey="id" />

        <tfoot>
          <tr>
            <td>Show custom data here</td>
            <td>Show custom data here</td>
            <td>Show custom data here</td>
          </tr>
        </tfoot>
      </Table>
    </ReactSpecimen>
  </CustomPage>
);
