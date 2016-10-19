/* eslint-disable global-require, import/no-unresolved */
import tablePages from './table';
import columnDefinitionPages from './column-definition';
import dataPages from './data';
import featuresPages from './features';
import examplesPages from './examples';
import searchPages from './search';
import contributingPages from './contributing';

export default [
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
  searchPages('search'),
  featuresPages('features'),
  {
    path: 'easy',
    title: 'Easy Version',
    component: require('reactabular-easy/../README.md')
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
    component: require('reactabular/../CHANGELOG.md')
  },
  {
    path: 'license',
    title: 'License',
    component: require('../LICENSE.md')
  }
];
