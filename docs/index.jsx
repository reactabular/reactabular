import 'purecss/build/pure.css';
import 'highlight.js/styles/github.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import {
  TableDocs, HeaderDocs, BodyDocs, StyleDocs, PaginateDocs, EditDocs,
  SearchDocs, HighlightDocs, SortDocs,
} from './docs';
import {
  FullExample, TreeExample,
} from './examples';
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
      title: 'How to',
      pages: [
        {
          path: 'how-to/style',
          title: 'Style',
          component: StyleDocs,
        },
        {
          path: 'how-to/paginate',
          title: 'Paginate',
          component: PaginateDocs,
        },
        {
          path: 'how-to/sort',
          title: 'Sort',
          component: SortDocs,
        },
        {
          path: 'how-to/edit',
          title: 'Edit',
          component: EditDocs,
        },
        {
          path: 'how-to/search',
          title: 'Search',
          component: SearchDocs,
        },
        {
          path: 'how-to/highlight-search',
          title: 'Highlight Search Results',
          component: HighlightDocs,
        },
      ],
    },
    {
      title: 'Examples',
      pages: [
        {
          path: 'examples/all',
          title: 'All Features',
          component: FullExample,
        },
        {
          path: 'examples/tree',
          title: 'Tree View',
          component: TreeExample,
        },
      ],
    },
    {
      title: 'Contribution',
      pages: [
        {
          path: 'contribution/how-to',
          title: 'How to',
          src: '../CONTRIBUTING.md',
        },
        {
          path: 'contribution/contributors',
          title: 'Contributors',
          src: '../CONTRIBUTORS.md',
        },
      ],
    },
    {
      path: 'changelog',
      title: 'Changelog',
      src: '../CHANGELOG.md',
    },
    {
      path: 'license',
      title: 'License',
      src: '../LICENSE.md',
    },
  ],
}, document.getElementById('app'));
