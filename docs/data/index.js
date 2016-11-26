/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Data',
  pages: [
    {
      path: `${rootPath}/resolving`,
      title: 'Resolving',
      component: require('table-resolver/README.md')
    },
    {
      path: `${rootPath}/inline-editing`,
      title: 'Inline Editing',
      component: require('./inline-editing.md')
    },
    {
      path: `${rootPath}/sorting`,
      title: 'Sorting',
      component: require('sortabular/README.md')
    },
    {
      path: `${rootPath}/pagination`,
      title: 'Pagination',
      component: require('./pagination.md')
    },
    {
      path: `${rootPath}/tree`,
      title: 'Tree',
      component: require('treetabular/README.md')
    }
  ]
});
