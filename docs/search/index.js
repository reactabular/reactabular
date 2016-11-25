/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Search',
  pages: [
    {
      path: `${rootPath}/search-algorithms`,
      title: 'Algorithms and Highlighting',
      component: require('searchtabular/README.md')
    },
    {
      path: `${rootPath}/search-per-field`,
      title: 'Per Field',
      component: require('reactabular-search-field/../README.md')
    },
    {
      path: `${rootPath}/search-columns`,
      title: 'Columns',
      component: require('reactabular-search-columns/../README.md')
    }
  ]
});
