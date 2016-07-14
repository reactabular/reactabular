```jsx
/*
import React from 'react';
import uuid from 'uuid';
import transform from 'lodash/transform';
import { Table, edit } from 'reactabular';

import countries from './data/countries';
*/

const options = transform(countries, (result, name, value) => {
  result.push({ value, name });
}, []);
const data = [
  {
    name: 'Boolean',
    editor: edit.boolean(),
    code: 'edit.boolean({ props: <props> })',
    description: `If initial value is true,
      allows setting to false and vice versa.
      Demo value defaults to false always.`,
    id: uuid.v4()
  },
  {
    name: 'Dropdown',
    editor: edit.dropdown({ options }),
    code: 'edit.dropdown({ options: [[<value>, <name>]], props: <props> })',
    description: `The dropdown expects an array
      of value-name object pairs and emits
      the selected one.`,
    id: uuid.v4()
  },
  {
    name: 'Customized dropdown',
    editor: edit.dropdown({
      options,
      fields: {
        // reversing fields to show the API
        name: 'value',
        value: 'name'
      }
    }),
    code: `edit.dropdown(
      {
        options: [[<value>, <name>]],
        fields: {name: <name>, value: <value>},
        props: <props>
      }
    )`,
    description: 'This dropdown uses custom field definition.',
    id: uuid.v4()
  },
  {
    name: 'Input',
    editor: edit.input(),
    code: 'edit.input({ props: <props> })',
    description: 'Just a wrapper for a regular input.',
    id: uuid.v4()
  }
];

const columns = [
  {
    header: {
      label: 'Name'
    },
    cell: {
      property: 'name'
    }
  },
  {
    header: {
      label: 'Editor'
    },
    cell: {
      property: 'editor',
      format: value => React.createElement(value, {
        value: '',
        onValue: v => console.log(v)
      })
    }
  },
  {
    header: {
      label: 'Code'
    },
    cell: {
      property: 'code'
    }
  },
  {
    header: {
      label: 'Description'
    },
    cell: {
      property: 'description'
    }
  }
];

const EditorsTable = () => (
  <Table.Provider
    className="pure-table pure-table-striped"
    columns={columns}
    data={data}
    rowKey="id"
  >
    <Table.Header />

    <Table.Body />
  </Table.Provider>
);

<EditorsTable />
```
