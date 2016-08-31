/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Features',
  pages: [
    {
      path: `${rootPath}/inline-editing`,
      title: 'Inline Editing',
      component: require('./inline-editing.md')
    },
    {
      path: `${rootPath}/resizing-columns`,
      title: 'Resizing Columns',
      component: require('reactabular-resizable/../README.md')
    },
    {
      path: `${rootPath}/toggling-column-visibility`,
      title: 'Toggling Column Visibility',
      component: require('reactabular-visibility-toggles/../README.md')
    },
    {
      path: `${rootPath}/selecting-rows`,
      title: 'Selecting Rows',
      component: require('reactabular-select/../README.md')
    },
    {
      path: `${rootPath}/drag-and-drop`,
      title: 'Drag and Drop',
      component: require('reactabular-dnd/../README.md')
    },
    {
      path: `${rootPath}/sticky`,
      title: 'Sticky',
      component: require('reactabular-sticky/../README.md')
    },
    {
      path: `${rootPath}/virtualization`,
      title: 'Virtualization',
      component: require('reactabular-virtualized/../README.md')
    },
    {
      path: `${rootPath}/tree`,
      title: 'Tree',
      component: require('reactabular-tree/../README.md')
    }
  ]
});
