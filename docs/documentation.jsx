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
import * as dnd from 'reactabular-dnd';
import * as resizable from 'reactabular-resizable';
import * as Virtualized from 'reactabular-virtualized';
import * as extensions from 'reactabular-column-extensions';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as stylesheet from 'stylesheet-helpers';
import * as searchtabular from 'searchtabular';
import * as sortabular from 'sortabular';
import * as selectabular from 'selectabular';
import * as treetabular from 'treetabular';
import * as resolve from 'table-resolver';
import VisibilityToggles from 'react-visibility-toggles';

import * as rowsDefinitions from './data/definitions';
import * as customHelpers from './helpers';
import countries from './data/countries';

const documentationImports = {
  Table: { ...Table },
  Sticky: { ...Sticky },
  edit: { ...reactEdit },
  dnd: { ...dnd },
  easy: { ...easy },
  resizable: { ...resizable },
  extensions: { ...extensions },
  VisibilityToggles,
  Virtualized: { ...Virtualized },
  resolve: { ...resolve },
  stylesheet: { ...stylesheet },
  search: { ...searchtabular },
  select: { ...selectabular },
  sort: { ...sortabular },
  tree: { ...treetabular },
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
