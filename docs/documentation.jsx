/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import GithubCorner from 'react-github-corner';
import { Catalog, CodeSpecimen, ReactSpecimen } from 'catalog';
import * as reactDnd from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { compose, createStore } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid';
import {
  cloneDeep, keys, values, find, findIndex, orderBy, transform
} from 'lodash';
import * as easy from 'reactabular-easy';
import * as reactEdit from 'react-edit';
import * as reactabular from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as tree from 'reactabular-tree';
import * as resizable from 'reactabular-resizable';
import * as select from 'reactabular-select';
import VisibilityToggles from 'reactabular-visibility-toggles';
import * as Virtualized from 'reactabular-virtualized';
import * as stylesheet from 'stylesheet-helpers';
import * as searchtabular from 'searchtabular';
import * as sortabular from 'sortabular';
import selectabular from 'selectabular';

import * as rowsDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import countries from './data/countries';

const documentationImports = {
  Table: { ...reactabular.Table },
  Sticky: { ...reactabular.Sticky },
  edit: { ...reactEdit },
  resolve: { ...reactabular.resolve },
  SearchColumns: reactabular.SearchColumns,
  Search: reactabular.Search,
  dnd: { ...dnd },
  tree: { ...tree },
  easy: { ...easy },
  resizable: { ...resizable },
  VisibilityToggles,
  Virtualized: { ...Virtualized },
  stylesheet: { ...stylesheet },
  search: { ...searchtabular },
  select: { ...selectabular },
  sort: { ...sortabular },
  ...select,
  ...reactDnd,
  classnames,
  compose,
  connect,
  createStore,
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

export default ({ title, pages }) => {
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
              bash: props => <CodeSpecimen {...props} lang="bash" />,
              css: props => <CodeSpecimen {...props} lang="css" />,
              javascript: props => <CodeSpecimen {...props} lang="javascript" />,
              js: props => <CodeSpecimen {...props} lang="javascript" />,
              json: props => <CodeSpecimen {...props} lang="json" />,
              jsx: props => <ReactSpecimen {...props} />
            }}
          />
        </div>
      );
    }
  }

  return reactDnd.DragDropContext(HTML5Backend)(App); // eslint-disable-line new-cap
};
