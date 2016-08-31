/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Table',
  pages: [
    {
      path: rootPath,
      title: 'Introduction',
      component: require('./introduction.md')
    },
    {
      path: `${rootPath}/components`,
      title: 'Components',
      component: require('reactabular-table/../README.md')
    },
    {
      path: `${rootPath}/styling`,
      title: 'Styling',
      component: require('./styling.md')
    },
    {
      path: `${rootPath}/overriding-default-elements`,
      title: 'Overriding Default Elements',
      component: require('./overriding-default-elements.md')
    }
  ]
});
