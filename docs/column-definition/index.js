/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';

export default rootPath => ({
  title: 'Column Definition',
  pages: [
    {
      path: rootPath,
      title: 'Introduction',
      content: pageLoader(() => import('./introduction.md'))
    },
    {
      path: `${rootPath}/property`,
      title: 'Property',
      content: pageLoader(() => import('./property.md'))
    },
    {
      path: `${rootPath}/body-cell`,
      title: 'BodyCell',
      content: pageLoader(() => import('./body-cell.md'))
    },
    {
      path: `${rootPath}/header-cell`,
      title: 'HeaderCell',
      content: pageLoader(() => import('./header-cell.md'))
    },
    {
      path: `${rootPath}/nested-columns`,
      title: 'Nested Columns',
      content: pageLoader(() => import('./nested-columns.md'))
    }
  ]
});
