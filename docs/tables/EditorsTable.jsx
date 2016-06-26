/* eslint-disable no-console, react/prop-types */
import React from 'react';
import uuid from 'uuid';
import transform from 'lodash/transform';

import { Table, editors } from '../../src';

import countries from '../data/countries';

const options = transform(countries, (result, name, value) => {
  result.push({ value, name });
}, []);
const data = [
  {
    name: 'Boolean',
    editor: editors.boolean(),
    code: 'editors.boolean()',
    description: `If initial value is true,
      allows setting to false and vice versa.
      Demo value defaults to false always.`,
    id: uuid.v4(),
  },
  {
    name: 'Dropdown',
    editor: editors.dropdown({
      options,
    }),
    code: 'editors.dropdown({ options: countries })',
    description: `The dropdown expects an array
      of value-name object pairs and emits
      the selected one.`,
    id: uuid.v4(),
  },
  {
    name: 'Customized dropdown',
    editor: editors.dropdown({
      options,
      fields: {
        // reversing fields to show the API
        name: 'value',
        value: 'name',
      },
    }),
    code: 'editors.dropdown({ options: countries, fields: {name: <name>, value: <value>} })',
    description: 'This dropdown uses custom field definition.',
    id: uuid.v4(),
  },
  {
    name: 'Input',
    editor: editors.input(),
    code: 'editors.input()',
    description: 'Just a wrapper for a regular input.',
    id: uuid.v4(),
  },
];

const columns = [
  {
    header: {
      label: 'Name',
    },
    cell: {
      property: 'name',
    },
  },
  {
    header: {
      label: 'Editor',
    },
    cell: {
      property: 'editor',
      format: value => React.createElement(value, {
        value: '',
        onValue: v => console.log(v),
      }),
    },
  },
  {
    header: {
      label: 'Code',
    },
    cell: {
      property: 'code',
    },
  },
  {
    header: {
      label: 'Description',
    },
    cell: {
      property: 'description',
    },
  },
];

const EditorsTable = () => (
  <Table
    className="pure-table pure-table-striped"
    columns={columns}
    data={data}
  >
    <Table.Header />

    <Table.Body rowKey="id" />
  </Table>
);

export default EditorsTable;
