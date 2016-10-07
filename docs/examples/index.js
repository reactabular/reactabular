/* eslint-disable global-require, import/no-unresolved */
export default rootPath => ({
  title: 'Examples',
  props: {
    style: {
      borderTop: '2px solid #ddd'
    }
  },
  pages: [
    {
      path: `${rootPath}/all-features`,
      title: 'All Features',
      component: require('./all-features.md')
    },
    {
      path: `${rootPath}/crud`,
      title: 'CRUD',
      component: require('./crud.md')
    },
    {
      path: `${rootPath}/crud-redux`,
      title: 'CRUD with Redux',
      component: require('./crud-redux.md')
    },
    {
      path: `${rootPath}/excel`,
      title: 'Excel',
      component: require('./excel.md')
    },
    {
      path: `${rootPath}/expand-column-to-fit`,
      title: 'Expand Column to Fit',
      component: require('./expand-column-to-fit.md')
    },
    {
      path: `${rootPath}/fixed-width-columns`,
      title: 'Fixed Width Columns',
      component: require('./fixed-width-columns.md')
    },
    {
      path: `${rootPath}/infinite-scrolling`,
      title: 'Infinite Scrolling',
      component: require('./infinite-scrolling.md')
    },
    {
      path: `${rootPath}/multiple-async-instances`,
      title: 'Multiple Async Instances',
      component: require('./multiple-async-instances.md')
    }
  ]
});
