/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';

export default rootPath => ({
  title: 'Drag and Drop',
  pages: [
    {
      path: `${rootPath}`,
      title: 'Introduction',
      content: pageLoader(() => import('../../packages/reactabular-dnd/README.md'))
    },
    {
      path: `${rootPath}/with-tree`,
      title: 'Drag and Drop with Tree',
      content: pageLoader(() => import('./with-tree.md'))
    },
    {
      path: `${rootPath}/with-virtualization`,
      title: 'Drag and Drop with Virtualization',
      content: pageLoader(() => import('./with-virtualization.md'))
    }
  ]
});
