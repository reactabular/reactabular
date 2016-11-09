/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Drag and Drop',
  pages: [
    {
      path: `${rootPath}`,
      title: 'Introduction',
      component: require('reactabular-dnd/../README.md')
    },
    {
      path: `${rootPath}/with-tree`,
      title: 'Drag and Drop with Tree',
      component: require('./with-tree.md')
    },
    {
      path: `${rootPath}/with-virtualization`,
      title: 'Drag and Drop with Virtualization',
      component: require('./with-virtualization.md')
    }
  ]
});
