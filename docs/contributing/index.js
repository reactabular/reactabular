/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Contributing',
  pages: [
    {
      path: `${rootPath}/how-to`,
      title: 'How to',
      component: require('../../CONTRIBUTING.md')
    },
    {
      path: `${rootPath}/contributors`,
      title: 'Contributors',
      component: require('../../CONTRIBUTORS.md')
    }
  ]
});
