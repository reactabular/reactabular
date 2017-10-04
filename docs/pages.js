/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';
import tablePages from './table';
import columnDefinitionPages from './column-definition';
import dataPages from './data';
import dragAndDropPages from './drag-and-drop';
import featuresPages from './features';
import examplesPages from './examples';
import contributingPages from './contributing';

export default [
  {
    path: '/',
    title: 'Introduction',
    content: pageLoader(() => import('../README.md'))
  },
  tablePages('table'),
  columnDefinitionPages('column-definition'),
  dataPages('data'),
  dragAndDropPages('drag-and-drop'),
  featuresPages('features'),
  {
    path: 'easy',
    title: 'Easy Version',
    content: pageLoader(() => import('reactabular-easy/README.md'))
  },
  examplesPages('examples'),
  {
    path: 'installing',
    title: 'Installing',
    content: pageLoader(() => import('./installing.md'))
  },
  contributingPages('contributing'),
  {
    path: 'changelog',
    title: 'Changelog',
    content: pageLoader(() => import('../CHANGELOG.md'))
  },
  {
    path: 'license',
    title: 'License',
    content: pageLoader(() => import('../LICENSE.md'))
  }
];
