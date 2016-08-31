/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Column Definition',
  pages: [
    {
      path: rootPath,
      title: 'Introduction',
      component: require('./introduction.md')
    },
    {
      path: `${rootPath}/property`,
      title: 'Property',
      component: require('./property.md')
    },
    {
      path: `${rootPath}/props`,
      title: 'Props',
      component: require('./props.md')
    },
    {
      path: `${rootPath}/header`,
      title: 'Header',
      component: require('./header.md')
    },
    {
      path: `${rootPath}/cell`,
      title: 'Cell',
      component: require('./cell.md')
    },
    {
      path: `${rootPath}/formatters`,
      title: 'Formatters',
      component: require('./formatters.md')
    },
    {
      path: `${rootPath}/transforms`,
      title: 'Transforms',
      component: require('./transforms.md')
    },
    {
      path: `${rootPath}/nested-columns`,
      title: 'Nested Columns',
      component: require('./nested-columns.md')
    }
  ]
});
