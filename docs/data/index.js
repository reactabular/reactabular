/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Data',
  pages: [
    {
      path: `${rootPath}/resolving`,
      title: 'Resolving',
      component: require('reactabular-resolve/../README.md')
    },
    {
      path: `${rootPath}/inline-editing`,
      title: 'Inline Editing',
      component: require('./inline-editing.md')
    },
    {
      path: `${rootPath}/sorting`,
      title: 'Sorting',
      component: require('reactabular-sort/../README.md')
    },
    {
      path: `${rootPath}/paginating`,
      title: 'Paginating',
      component: require('./paginating.md')
    },
    {
      path: `${rootPath}/drag-and-drop`,
      title: 'Drag and Drop',
      component: require('reactabular-dnd/../README.md')
    },
    {
      path: `${rootPath}/tree`,
      title: 'Tree',
      component: require('reactabular-tree/../README.md')
    }
  ]
});
