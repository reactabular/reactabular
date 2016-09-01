/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';

import 'purecss/build/pure.css';
import 'react-pagify/style.css';
import 'reactabular-resizable/../style.css';
import 'reactabular-sort/../style.css';
import 'reactabular-tree/../style.css';
import 'reactabular-visibility-toggles/../style.css';

import documentation from './documentation';
import pages from './pages';

import './main.css';
import '../style.css';

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

ReactDOM.render(
  React.createElement(documentation({
    title: `Reactabular ${VERSION}`, // eslint-disable-line no-undef
    pages
  })),
  document.getElementById('app')
);
