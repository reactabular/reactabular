/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';

export default rootPath => ({
  title: 'Data',
  pages: [
    {
      path: `${rootPath}/resolving`,
      title: 'Resolving',
      content: pageLoader(() => import('table-resolver/README.md'))
    },
    {
      path: `${rootPath}/inline-editing`,
      title: 'Inline Editing',
      content: pageLoader(() => import('./inline-editing.md'))
    },
    {
      path: `${rootPath}/sorting`,
      title: 'Sorting',
      content: pageLoader(() => import('sortabular/README.md'))
    },
    {
      path: `${rootPath}/pagination`,
      title: 'Pagination',
      content: pageLoader(() => import('./pagination.md'))
    },
    {
      path: `${rootPath}/tree`,
      title: 'Tree',
      content: pageLoader(() => import('treetabular/README.md'))
    }
  ]
});
