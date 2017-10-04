/* eslint-disable global-require, import/no-unresolved */
import { pageLoader } from 'catalog';

export default rootPath => ({
  title: 'Features',
  pages: [
    {
      path: `${rootPath}/search`,
      title: 'Search',
      content: pageLoader(() => import('searchtabular/README.md'))
    },
    {
      path: `${rootPath}/resizing-columns`,
      title: 'Resizing Columns',
      content: pageLoader(() => import('../../packages/reactabular-resizable/README.md'))
    },
    {
      path: `${rootPath}/toggling-column-visibility`,
      title: 'Toggling Column Visibility',
      content: pageLoader(() => import('react-visibility-toggles/README.md'))
    },
    {
      path: `${rootPath}/selection`,
      title: 'Selection',
      content: pageLoader(() => import('selectabular/README.md'))
    },
    {
      path: `${rootPath}/sticky`,
      title: 'Sticky',
      content: pageLoader(() => import('../../packages/reactabular-sticky/README.md'))
    },
    {
      path: `${rootPath}/virtualization`,
      title: 'Virtualization',
      content: pageLoader(() => import('../../packages/reactabular-virtualized/README.md'))
    }
  ]
});
