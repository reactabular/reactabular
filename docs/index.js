/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';

import 'purecss/build/pure.css';
import 'sortabular/style.css';
import 'react-pagify/style.css';
import 'treetabular/style.css';
import 'react-visibility-toggles/style.css';
import '../packages/reactabular-resizable/style.css';

import documentation from './documentation';
import pages from './pages';

import './main.css';
import '../style.css';

// TODO: Doesn’t work in React 16 yet
// if (process.env.NODE_ENV !== 'production') {
//   React.Perf = require('react-addons-perf');
// }

ReactDOM.render(
  React.createElement(documentation({
    title: `Reactabular ${VERSION}`, // eslint-disable-line no-undef
    pages
  })),
  document.getElementById('app')
);
