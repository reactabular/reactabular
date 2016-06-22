/* eslint-disable global-require, import/no-unresolved */
import 'purecss/build/pure.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import * as reactabular from '../src';
import * as dataDefinitions from './data/definitions';
import * as customComponents from './components';
import {
  BodyDocs, StyleDocs, PaginateDocs, EditDocs,
  SearchDocs, HighlightDocs, SortDocs,
} from './docs';
import {
  FullExample, TreeExample,
} from './examples';
import './main.css';
import './skylight.css';
import '../style.css';

const documentationImports = {
  ...reactabular,
  ...dataDefinitions,
  ...customComponents,
};

Catalog.render({
  title: `Reactabular v${VERSION}`, // eslint-disable-line no-undef
  pages: [
    {
      path: '/',
      title: 'Introduction',
      imports: documentationImports,
      component: require('catalog/lib/loader!raw!../README.md'),
    },
    {
      title: 'Components',
      pages: [
        {
          path: 'components/table',
          title: 'Table',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./docs/table.md'),
        },
        {
          path: 'components/header',
          title: 'Table.Header',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./docs/header.md'),
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
          path: 'how-to/customize-footer',
          title: 'Customize Footer',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./docs/footer.md'),
        },
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
      title: 'Contributing',
      pages: [
        {
          path: 'contributing/how-to',
          title: 'How to',
          component: require('catalog/lib/loader!raw!../CONTRIBUTING.md'),
        },
        {
          path: 'contributing/contributors',
          title: 'Contributors',
          component: require('catalog/lib/loader!raw!../CONTRIBUTORS.md'),
        },
      ],
    },
    {
      path: 'changelog',
      title: 'Changelog',
      component: require('catalog/lib/loader!raw!../CHANGELOG.md'),
    },
    {
      path: 'license',
      title: 'License',
      component: require('catalog/lib/loader!raw!../LICENSE.md'),
    },
  ],
}, document.getElementById('app'));
