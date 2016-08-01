/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import Fork from 'react-ghfork';
import { Catalog, CodeSpecimen, ReactSpecimen } from 'catalog';
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
import EasyTable from 'reactabular-easy';
import * as reactabular from 'reactabular';
import * as stylesheet from 'stylesheet-helpers';

import * as rowsDefinitions from './data/definitions';
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
  Table: { ...reactabular.Table },
  Sticky: { ...reactabular.Sticky },
  search: { ...reactabular.search },
  sort: { ...reactabular.sort },
  edit: { ...reactabular.edit },
  highlight: { ...reactabular.highlight },
  resolve: { ...reactabular.resolve },
  resizableColumn: reactabular.resizableColumn,
  EasyTable,
  stylesheet: { ...stylesheet },
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
  ...rowsDefinitions,
  ...customHelpers
};
const title = `Reactabular v${VERSION}`; // eslint-disable-line no-undef
const pages = [
  {
    path: '/',
    title: 'Introduction',
    imports: documentationImports,
    component: require('../README.md'),
    props: {
      style: {
        borderBottom: '2px solid #ddd'
      }
    }
  },
  {
    title: 'Table',
    pages: [
      {
        path: 'table',
        title: 'Introduction',
        imports: documentationImports,
        component: require('./table/introduction.md')
      },
      {
        path: 'table/components',
        title: 'Components',
        imports: documentationImports,
        component: require('../packages/reactabular-table/README.md')
      },
      {
        path: 'table/styling',
        title: 'Styling',
        imports: documentationImports,
        component: require('./table/styling.md')
      },
      {
        path: 'table/overriding-default-elements',
        title: 'Overriding Default Elements',
        imports: documentationImports,
        component: require('./table/overriding-default-elements.md')
      }
    ]
  },
  {
    title: 'Column Definition',
    pages: [
      {
        path: 'column-definition',
        title: 'Introduction',
        imports: documentationImports,
        component: require('./column-definition/introduction.md')
      },
      {
        path: 'column-definition/props',
        title: 'Props',
        imports: documentationImports,
        component: require('./column-definition/props.md')
      },
      {
        path: 'column-definition/header',
        title: 'Header',
        imports: documentationImports,
        component: require('./column-definition/header.md')
      },
      {
        path: 'column-definition/cell',
        title: 'Cell',
        imports: documentationImports,
        component: require('./column-definition/cell.md')
      },
      {
        path: 'column-definition/formatters',
        title: 'Formatters',
        imports: documentationImports,
        component: require('./column-definition/formatters.md')
      },
      {
        path: 'column-definition/transforms',
        title: 'Transforms',
        imports: documentationImports,
        component: require('./column-definition/transforms.md')
      },
      {
        path: 'column-definition/nested-columns',
        title: 'Nested Columns',
        imports: documentationImports,
        component: require('./column-definition/nested-columns.md')
      }
    ]
  },
  {
    path: 'resolving-data',
    title: 'Resolving Data',
    imports: documentationImports,
    component: require('../packages/reactabular-resolve/README.md')
  },
  {
    path: 'editing',
    title: 'Editing',
    imports: documentationImports,
    component: require('../packages/reactabular-edit/README.md')
  },
  {
    path: 'sorting',
    title: 'Sorting',
    imports: documentationImports,
    component: require('../packages/reactabular-sort/README.md')
  },
  {
    path: 'searching',
    title: 'Searching',
    imports: documentationImports,
    component: require('../packages/reactabular-search/README.md')
  },
  {
    path: 'paginating',
    title: 'Paginating',
    imports: documentationImports,
    component: require('./paginating.md')
  },
  {
    path: 'highlighting',
    title: 'Highlighting',
    imports: documentationImports,
    component: require('../packages/reactabular-highlight/README.md')
  },
  {
    path: 'resizable-columns',
    title: 'Resizable Columns',
    imports: documentationImports,
    component: require('../packages/reactabular-resizable/README.md')
  },
  {
    path: 'sticky',
    title: 'Sticky',
    imports: documentationImports,
    component: require('../packages/reactabular-sticky/README.md')
  },
  {
    path: 'easy',
    title: 'Easy Version',
    imports: documentationImports,
    component: require('../packages/reactabular-easy/README.md')
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
        component: require('./examples/all-features.md')
      },
      {
        path: 'examples/crud',
        title: 'CRUD',
        imports: documentationImports,
        component: require('./examples/crud.md')
      },
      {
        path: 'examples/drag-and-drop',
        title: 'Drag and Drop',
        imports: documentationImports,
        component: require('./examples/drag-and-drop.md')
      },
      {
        path: 'examples/excel',
        title: 'Excel',
        imports: documentationImports,
        component: require('./examples/excel.md')
      },
      {
        path: 'examples/fixed-width-columns',
        title: 'Fixed Width Columns',
        imports: documentationImports,
        component: require('./examples/fixed-width-columns.md')
      },
      {
        path: 'examples/infinite-scrolling',
        title: 'Infinite Scrolling',
        imports: documentationImports,
        component: require('./examples/infinite-scrolling.md')
      },
      {
        path: 'examples/selection',
        title: 'Selection',
        imports: documentationImports,
        component: require('./examples/selection.md')
      },
      {
        path: 'examples/toggle-columns',
        title: 'Toggle Columns',
        imports: documentationImports,
        component: require('./examples/toggle-columns.md')
      },
      {
        path: 'examples/tree-view',
        title: 'Tree View',
        imports: documentationImports,
        component: require('./examples/tree-view.md')
      }
    ]
  },
  {
    path: 'installing',
    title: 'Installing',
    component: require('./installing.md')
  },
  {
    title: 'Contributing',
    pages: [
      {
        path: 'contributing/how-to',
        title: 'How to',
        component: require('../CONTRIBUTING.md')
      },
      {
        path: 'contributing/contributors',
        title: 'Contributors',
        component: require('../CONTRIBUTORS.md')
      }
    ]
  },
  {
    path: 'changelog',
    title: 'Changelog',
    component: require('../packages/reactabular/CHANGELOG.md')
  },
  {
    path: 'license',
    title: 'License',
    component: require('../LICENSE.md')
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
        javascript: props => <CodeSpecimen {...props} lang="javascript" />,
        js: props => <CodeSpecimen {...props} lang="javascript" />,
        jsx: props => <ReactSpecimen {...props} />
      }}
    />
  </div>,
  document.getElementById('app')
);
