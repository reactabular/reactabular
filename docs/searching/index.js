/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Searching',
  pages: [
    {
      path: `${rootPath}/algorithms`,
      title: 'Algorithms',
      component: require('reactabular-search/../README.md')
    },
    {
      path: `${rootPath}/per-field`,
      title: 'Per Field',
      component: require('reactabular-search-field/../README.md')
    },
    {
      path: `${rootPath}/columns`,
      title: 'Columns',
      component: require('reactabular-search-columns/../README.md')
    },
    {
      path: `${rootPath}/highlighting-results`,
      title: 'Highlighting Results',
      component: require('reactabular-highlight/../README.md')
    }
  ]
});
