import 'purecss/build/pure.css';
import 'highlight.js/styles/github.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import { TableDocs, HeaderDocs, BodyDocs } from './docs';
import './main.css';
import './skylight.css';
import '../style.css';

import pkg from '../package.json';

Catalog.render({
  title: `Reactabular v${pkg.version}`,
  pages: [
    {
      path: '/',
      title: 'Introduction',
      src: '../README.md',
    },
    {
      title: 'Components',
      pages: [
        {
          path: 'table',
          title: 'Table',
          component: TableDocs
        },
        {
          path: 'header',
          title: 'Header',
          component: HeaderDocs,
        },
        {
          path: 'body',
          title: 'Body',
          component: BodyDocs,
        },
      ],
    },
    {
      path: '/contributing',
      title: 'Contributing',
      src: '../CONTRIBUTING.md',
    },
    {
      path: '/contributors',
      title: 'Contributors',
      src: '../CONTRIBUTORS.md',
    },
  ],
}, document.getElementById('app'));
