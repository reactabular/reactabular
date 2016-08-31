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
      path: `${rootPath}/search-algorithms`,
      title: 'Search Algorithms',
      component: require('reactabular-search/../README.md')
    },
    {
      path: `${rootPath}/search-per-field`,
      title: 'Search per Field',
      component: require('reactabular-search-field/../README.md')
    },
    {
      path: `${rootPath}/search-columns`,
      title: 'Search Columns',
      component: require('reactabular-search-columns/../README.md')
    },
    {
      path: `${rootPath}/highlighting-search-results`,
      title: 'Highlighting Search Results',
      component: require('reactabular-highlight/../README.md')
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
    }
  ]
});
