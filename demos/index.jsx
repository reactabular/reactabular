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
          path: 'components/table',
          title: 'Table',
          component: TableDocs,
        },
        {
          path: 'components/header',
          title: 'Table.Header',
          component: HeaderDocs,
        },
        {
          path: 'components/body',
          title: 'Table.Body',
          component: BodyDocs,
        },
      ],
    },
    {
      title: 'Contribution',
      pages: [
        {
          path: 'contribution/contributing',
          title: 'How to',
          src: '../CONTRIBUTING.md',
        },
        {
          path: 'contribution/contributors',
          title: 'Contributors',
          src: '../CONTRIBUTORS.md',
        },
        {
          path: 'contribution/license',
          title: 'License',
          src: '../LICENSE.md',
        },
      ],
    },
  ],
}, document.getElementById('app'));
