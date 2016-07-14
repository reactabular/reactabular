/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import Fork from 'react-ghfork';
import { Catalog, ReactSpecimen } from 'catalog';
import * as reactDnd from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { compose } from 'redux';
import uuid from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import keys from 'lodash/keys';
import values from 'lodash/values';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import transform from 'lodash/transform';
import * as reactabular from '../src';
import * as dataDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import countries from './data/countries';

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
  ...reactDnd,
  HTML5Backend,
  classnames,
  compose,
  uuid,
  cloneDeep,
  find,
  findIndex,
  keys,
  values,
  orderBy,
  transform,
  countries,
  React,
  ReactDOM,
  ...dataDefinitions,
  ...customHelpers
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
        path: 'formatters',
        title: 'Formatters',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/formatters.md')
      },
      {
        path: 'transforms',
        title: 'Transforms',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./column-definition/transforms.md')
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
    path: 'resolving',
    title: 'Resolving',
    imports: documentationImports,
    component: require('catalog/lib/loader!raw!./resolving.md')
  },
  {
    title: 'Editing',
    pages: [
      {
        path: 'editing',
        title: 'Introduction',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./editing/introduction.md')
      },
      {
        path: 'editing/api',
        title: 'API',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./editing/api.md')
      },
      {
        path: 'editing/customizing',
        title: 'Customizing',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./editing/customizing.md')
      }
    ]
  },
  {
    title: 'Sorting',
    pages: [
      {
        path: 'sorting',
        title: 'Introduction',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./sorting/introduction.md')
      },
      {
        path: 'sorting/api',
        title: 'API',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./sorting/api.md')
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
        path: 'search/customizing',
        title: 'Customizing',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./search/customizing.md')
      },
      {
        path: 'search/pagination',
        title: 'Pagination',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./search/pagination.md')
      },
      {
        path: 'search/highlighting',
        title: 'Highlighting',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./search/highlighting.md')
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
        path: 'examples/all-features',
        title: 'All Features',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/all-features.md')
      },
      {
        path: 'examples/drag-and-drop',
        title: 'Drag and Drop',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/drag-and-drop.md')
      },
      {
        path: 'examples/excel',
        title: 'Excel',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/excel.md')
      },
      {
        path: 'examples/fixed-width-columns',
        title: 'Fixed Width Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/fixed-width-columns.md')
      },
      {
        path: 'examples/infinite-scrolling',
        title: 'Infinite Scrolling',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/infinite-scrolling.md')
      },
      {
        path: 'examples/resizable-columns',
        title: 'Resizable Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/resizable-columns.md')
      },
      {
        path: 'examples/selection',
        title: 'Selection',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/selection.md')
      },
      {
        path: 'examples/sort-and-search',
        title: 'Sort and Search',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/sort-and-search.md')
      },
      {
        path: 'examples/stateful-table',
        title: 'Stateful Table',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/stateful-table.md')
      },
      {
        path: 'examples/sticky-headers',
        title: 'Sticky Headers',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/sticky-headers.md')
      },
      {
        path: 'examples/toggle-columns',
        title: 'Toggle Columns',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/toggle-columns.md')
      },
      {
        path: 'examples/tree-view',
        title: 'Tree View',
        imports: documentationImports,
        component: require('catalog/lib/loader!raw!./examples/tree-view.md')
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
      project="reactabular/reactabular"
      style={{
        backgroundColor: '#000'
      }}
    />
    <Catalog
      title={title}
      logoSrc="../images/logo.png"
      pages={pages}
      specimens={{
        jsx: props => <ReactSpecimen {...props} />
      }}
    />
  </div>,
  document.getElementById('app')
);
