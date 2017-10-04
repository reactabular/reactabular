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
      path: `${rootPath}/props`,
      title: 'Props',
      content: pageLoader(() => import('./props.md'))
    },
    {
      path: `${rootPath}/header`,
      title: 'Header',
      content: pageLoader(() => import('./header.md'))
    },
    {
      path: `${rootPath}/cell`,
      title: 'Cell',
      content: pageLoader(() => import('./cell.md'))
    },
    {
      path: `${rootPath}/formatters`,
      title: 'Formatters',
      content: pageLoader(() => import('./formatters.md'))
    },
    {
      path: `${rootPath}/transforms`,
      title: 'Transforms',
      content: pageLoader(() => import('./transforms.md'))
    },
    {
      path: `${rootPath}/nested-columns`,
      title: 'Nested Columns',
      content: pageLoader(() => import('./nested-columns.md'))
    },
    {
      path: `${rootPath}/column-extensions`,
      title: 'Column Extensions',
      content: pageLoader(() => import('reactabular-column-extensions/README.md'))
    }
  ]
});
