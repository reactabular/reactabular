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
  ...customTables
};

Catalog.render({
  title: `Reactabular v${VERSION}`, // eslint-disable-line no-undef
  pages: [
    {
      path: '/',
      title: 'Introduction',
      imports: documentationImports,
      component: require('catalog/lib/loader!raw!../README.md')
    },
    {
      title: 'Table',
      pages: [
        {
          path: 'table',
          title: 'Introduction',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./table/introduction.md')
        },
        {
          path: 'table/column-definition',
          title: 'Column Definition',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./table/column-definition.md')
        },
        {
          path: 'table/header',
          title: 'Table.Header',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./table/header.md')
        },
        {
          path: 'table/body',
          title: 'Table.Body',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./table/body.md')
        }
      ]
    },
    {
      title: 'Formatters',
      pages: [
        {
          path: 'formatters',
          title: 'Introduction',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./formatters/introduction.md')
        },
        {
          path: 'formatters/api',
          title: 'API',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./formatters/api.md')
        },
        {
          path: 'formatters/highlight',
          title: 'Highlight',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./formatters/highlight.md')
        }
      ]
    },
    {
      title: 'Transforms',
      pages: [
        {
          path: 'transforms',
          title: 'Introduction',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./transforms/introduction.md')
        },
        {
          path: 'transforms/api',
          title: 'API',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./transforms/api.md')
        }
      ]
    },
    {
      path: 'editors',
      title: 'Editors',
      imports: documentationImports,
      component: require('catalog/lib/loader!raw!./editors.md')
    },
    {
      path: 'sort',
      title: 'Sort',
      imports: documentationImports,
      component: require('catalog/lib/loader!raw!./sort.md')
    },
    {
      title: 'Search',
      pages: [
        {
          path: 'search',
          title: 'Introduction',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./search/introduction.md')
        },
        {
          path: 'search/api',
          title: 'API',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./search/api.md')
        },
        {
          path: 'search/pagination',
          title: 'Pagination',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./search/pagination.md')
        }
      ]
    },
    {
      title: 'Examples',
      pages: [
        {
          path: 'examples/all-features',
          title: 'All Features',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/all-features.md')
        },
        {
          path: 'examples/tree-view',
          title: 'Tree View',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/tree-view.md')
        },
        {
          path: 'examples/selection',
          title: 'Selection',
          imports: documentationImports,
          component: require('catalog/lib/loader!raw!./examples/selection.md')
        }
      ]
    },
    {
      title: 'Contributing',
      pages: [
        {
          path: 'contributing/how-to',
          title: 'How to',
          component: require('catalog/lib/loader!raw!../CONTRIBUTING.md')
        },
        {
          path: 'contributing/contributors',
          title: 'Contributors',
          component: require('catalog/lib/loader!raw!../CONTRIBUTORS.md')
        }
      ]
    },
    {
      path: 'changelog',
      title: 'Changelog',
      component: require('catalog/lib/loader!raw!../CHANGELOG.md')
    },
    {
      path: 'license',
      title: 'License',
      component: require('catalog/lib/loader!raw!../LICENSE.md')
    }
  ]
}, document.getElementById('app'));
