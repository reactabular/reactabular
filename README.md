[![Join the chat at https://gitter.im/bebraw/reactabular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bebraw/reactabular) [![build status](https://secure.travis-ci.org/bebraw/reactabular.png)](http://travis-ci.org/bebraw/reactabular) [![bitHound Score](https://www.bithound.io/github/bebraw/reactabular/badges/score.svg)](https://www.bithound.io/github/bebraw/reactabular) [![Dependency Status](https://david-dm.org/bebraw/reactabular.svg)](https://david-dm.org/bebraw/reactabular) [![codecov](https://codecov.io/gh/bebraw/reactabular/branch/master/graph/badge.svg)](https://codecov.io/gh/bebraw/reactabular)

# Reactabular - Spectacular tables for React.js

Reactabular has been designed to be extensible. Rather than implementing a lot of functionality in its core, it provides extension points. You can, for instance, customize rendering on cell level. It is possible to implement functionality, such as search, pagination, sorting, and inline editing, through composition. The library includes a variety of utilities for this even though you may use third party ones as well.

By default Reactabular operates using a column and a data definition. It doesn't care where those come from. It just renders the table for you. This means Reactabular will fit right into your current data architecture. It doesn't constrain it in any manner.

The chosen approach pushes a lot of complexity out of the core. As a result it might take more code to achieve certain functionalities. This is the price of flexibility. And that's the primary design goal of Reactabular.

> If you want to learn more about React, read [SurviveJS - Webpack and React](http://survivejs.com/).

## Example

The following example illustrates the approach used by Reactabular:

```code
lang: jsx
---
import { Table, editors } from 'reactabular';

const data = [
  {
    id: 100,
    name: 'Foo'
  },
  {
    id: 101,
    name: 'Bar'
  }
];

const columns = [
  {
    property: 'name',
    header: 'Name',
    // Optional cell customizer
    cell: ({ value }) => <span>{value}</span>
  }
];

const DemoTable = () => (
  <Table
    className="pure-table pure-table-striped"
    columns={columns}
    data={data}
  >
    <Table.Header />

    <Table.Body rowKey="id" />
  </Table>
);
```

## Sponsors

[![SurviveJS](./images/survivejs.png)](http://survivejs.com/) [![Kenandy](./images/kenandy.png)](http://www.kenandy.com/)

## License

MIT. See LICENSE for details.
