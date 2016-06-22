/* eslint-disable global-require, import/no-unresolved */
import 'purecss/build/pure.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import * as reactabular from '../src';
import * as dataDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import * as customTables from './tables';
import './main.css';
import './skylight.css';
import '../style.css';

const documentationImports = {
  ...reactabular,
  ...dataDefinitions,
  ...customHelpers,
  ...customTables,
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
          component: require('catalog/lib/loader!raw!./components/table.md'),
        },
        {
          path: 'components/header',
          title: 'Table.Header',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./components/header.md'),
        },
        {
          path: 'components/body',
          title: 'Table.Body',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./components/body.md'),
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
          component: require('catalog/lib/loader!raw!./how-to/footer.md'),
        },
        {
          path: 'how-to/style',
          title: 'Style',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/style.md'),
        },
        {
          path: 'how-to/paginate',
          title: 'Paginate',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/paginate.md'),
        },
        {
          path: 'how-to/sort',
          title: 'Sort',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/sort.md'),
        },
        {
          path: 'how-to/edit',
          title: 'Edit',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/edit.md'),
        },
        {
          path: 'how-to/search',
          title: 'Search',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/search.md'),
        },
        {
          path: 'how-to/highlight-search',
          title: 'Highlight Search Results',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./how-to/highlight.md'),
        },
      ],
    },
    {
      title: 'Examples',
      pages: [
        {
          path: 'examples/all-features',
          title: 'All Features',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/all-features.md'),
        },
        {
          path: 'examples/tree-view',
          title: 'Tree View',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/tree-view.md'),
        },
        {
          path: 'examples/selection',
          title: 'Selection',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/selection.md'),
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
