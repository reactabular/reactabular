/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import Fork from 'react-ghfork';
import { Catalog, ReactSpecimen } from 'catalog';
import * as reactabular from '../src';
import * as dataDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import * as editorTables from './editors';
import * as examplesTables from './examples';
import * as formatterTables from './formatters';
import * as searchTables from './search';
import * as sortTables from './sort';
import * as tableTables from './table';
import * as transformsTables from './transforms';

import 'purecss/build/pure.css';
import 'react-ghfork/gh-fork-ribbon.ie.css';
import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import './main.css';
import '../style.css';

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const documentationImports = {
  ...reactabular,
  ...dataDefinitions,
  ...customHelpers,
  ...editorTables,
  ...examplesTables,
  ...formatterTables,
  ...searchTables,
  ...sortTables,
  ...tableTables,
  ...transformsTables
};
const title = `Reactabular v${VERSION}`; // eslint-disable-line no-undef
const pages = [
  {
    path: '/',
    title: 'Introduction',
    imports: documentationImports,
    component: require('catalog/lib/loader!raw!../README.md'),
    props: {
      style: {
        borderBottom: '2px solid #ddd'
      }
    }
  },
  {
    title: 'Column Definition',
    pages: [
      {
        path: 'column-definition',
        title: 'Introduction',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/introduction.md')
      },
      {
        path: 'column-definition/props',
        title: 'Props',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/props.md')
      },
      {
        path: 'column-definition/header',
        title: 'Header',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/header.md')
      },
      {
        path: 'column-definition/cell',
        title: 'Cell',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/cell.md')
      },
      {
        path: 'column-definition/nested-columns',
        title: 'Nested Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/nested-columns.md')
      }
    ]
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
        path: 'table/provider',
        title: 'Table.Provider',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./table/provider.md')
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
      },
      {
        path: 'table/styling',
        title: 'Styling',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./table/styling.md')
      },
      {
        path: 'table/overriding-default-elements',
        title: 'Overriding Default Elements',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./table/overriding-default-elements.md')
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
        path: 'transforms/edit',
        title: 'Edit',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./transforms/edit.md')
      },
      {
        path: 'transforms/sort',
        title: 'Sort',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./transforms/sort.md')
      },
      {
        path: 'transforms/as-formatters',
        title: 'As Formatters',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./transforms/as-formatters.md')
      }
    ]
  },
  {
    title: 'Editors',
    pages: [
      {
        path: 'editors',
        title: 'Introduction',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./editors/introduction.md')
      },
      {
        path: 'editors/api',
        title: 'API',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./editors/api.md')
      }
    ]
  },
  {
    title: 'Sort',
    pages: [
      {
        path: 'sort',
        title: 'Introduction',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./sort/introduction.md')
      },
      {
        path: 'sort/api',
        title: 'API',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./sort/api.md')
      }
    ]
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
    props: {
      style: {
        borderTop: '2px solid #ddd'
      }
    },
    pages: [
      {
        path: 'examples/sort-and-search',
        title: 'Sort and Search',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/sort-and-search.md')
      },
      {
        path: 'examples/tree-view',
        title: 'Tree View',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/tree-view.md')
      },
      {
        path: 'examples/toggle-columns',
        title: 'Toggle Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/toggle-columns.md')
      },
      {
        path: 'examples/selection',
        title: 'Selection',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/selection.md')
      },
      {
        path: 'examples/drag-and-drop',
        title: 'Drag and Drop',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/drag-and-drop.md')
      },
      {
        path: 'examples/stateful-table',
        title: 'Stateful Table',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/stateful-table.md')
      },
      {
        path: 'examples/fixed-width-columns',
        title: 'Fixed Width Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/fixed-width-columns.md')
      },
      {
        path: 'examples/resizable-columns',
        title: 'Resizable Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/resizable-columns.md')
      },
      {
        path: 'examples/sticky-header',
        title: 'Sticky Header',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/sticky-header.md')
      },
      {
        path: 'examples/all-features',
        title: 'All Features',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/all-features.md')
      }
    ]
  },
  {
    path: 'installing',
    title: 'Installing',
    component: require('catalog/lib/loader!raw!./installing.md')
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
];

ReactDOM.render(
  <div>
    <Fork
      className="right"
      project="bebraw/reactabular"
      style={{
        backgroundColor: '#000'
      }}
    />
    <Catalog
      title={title}
      pages={pages}
      specimens={{
        jsx: props => <ReactSpecimen {...props} />
      }}
    />
  </div>,
  document.getElementById('app')
);
