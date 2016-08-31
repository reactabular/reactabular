/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
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
import * as reactEdit from 'react-edit';
import * as reactabular from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as tree from 'reactabular-tree';
import VisibilityToggles from 'reactabular-visibility-toggles';
import * as Virtualized from 'reactabular-virtualized';
import * as stylesheet from 'stylesheet-helpers';

import 'purecss/build/pure.css';
import 'react-pagify/style.css';
import 'reactabular-resizable/../style.css';
import 'reactabular-sort/../style.css';
import 'reactabular-visibility-toggles/../style.css';

import * as rowsDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import countries from './data/countries';

import tablePages from './table';
import columnDefinitionPages from './column-definition';
import dataPages from './data';
import featuresPages from './features';
import examplesPages from './examples';
import contributingPages from './contributing';

import './main.css';
import '../style.css';

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const documentationImports = {
  Table: { ...reactabular.Table },
  Sticky: { ...reactabular.Sticky },
  search: { ...reactabular.search },
  select: { ...reactabular.select },
  sort: { ...reactabular.sort },
  edit: { ...reactEdit },
  highlight: { ...reactabular.highlight },
  resolve: { ...reactabular.resolve },
  SearchColumns: reactabular.SearchColumns,
  Search: reactabular.Search,
  dnd: { ...dnd },
  tree: { ...tree },
  resizableColumn: reactabular.resizableColumn,
  VisibilityToggles,
  Virtualized: { ...Virtualized },
  EasyTable,
  stylesheet: { ...stylesheet },
  ...reactDnd,
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
  ...rowsDefinitions,
  ...customHelpers
};
const title = `Reactabular v${VERSION}`; // eslint-disable-line no-undef
const pages = [
  {
    path: '/',
    title: 'Introduction',
    component: require('../README.md'),
    props: {
      style: {
        borderBottom: '2px solid #ddd'
      }
    }
  },
  tablePages('table'),
  columnDefinitionPages('column-definition'),
  dataPages('data'),
  featuresPages('features'),
  {
    path: 'easy',
    title: 'Easy Version',
    component: require('../packages/reactabular-easy/README.md')
  },
  examplesPages('examples'),
  {
    path: 'installing',
    title: 'Installing',
    component: require('./installing.md')
  },
  contributingPages('contributing'),
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

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <GithubCorner
          href="https://github.com/reactabular/reactabular"
          bannerColor="#fff"
          octoColor="#000"
          width={80}
          height={80}
          direction="right"
        />
        <Catalog
          title={title}
          logoSrc="../images/logo.png"
          pages={pages}
          imports={documentationImports}
          specimens={{
            css: props => <CodeSpecimen {...props} lang="css" />,
            javascript: props => <CodeSpecimen {...props} lang="javascript" />,
            js: props => <CodeSpecimen {...props} lang="javascript" />,
            jsx: props => <ReactSpecimen {...props} />
          }}
        />
      </div>
    );
  }
}
const DndApp = reactDnd.DragDropContext(HTML5Backend)(App); // eslint-disable-line new-cap

ReactDOM.render(<DndApp />, document.getElementById('app'));
