/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';

export default rootPath => ({
  title: 'Table',
  pages: [
    {
      path: rootPath,
      title: 'Introduction',
      content: pageLoader(() => import('./introduction.md'))
    },
    {
      path: `${rootPath}/components`,
      title: 'Components',
      content: pageLoader(() => import('../../packages/table/README.md'))
    },
    {
      path: `${rootPath}/styling`,
      title: 'Styling',
      content: pageLoader(() => import('./styling.md'))
    },
    {
      path: `${rootPath}/overriding-default-renderers`,
      title: 'Overriding Default Renderers',
      content: pageLoader(() => import('./overriding-default-renderers.md'))
    },
    {
      path: `${rootPath}/overriding-should-component-update`,
      title: 'Overriding shouldComponentUpdate',
      content: pageLoader(() => import('./overriding-should-component-update.md'))
    }
  ]
});
