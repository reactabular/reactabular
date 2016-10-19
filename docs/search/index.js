/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Search',
  pages: [
    {
      path: `${rootPath}/search-algorithms`,
      title: 'Algorithms',
      component: require('reactabular-search/../README.md')
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
    },
    {
      path: `${rootPath}/highlighting-search-results`,
      title: 'Highlighting',
      component: require('reactabular-highlight/../README.md')
    }
  ]
});
