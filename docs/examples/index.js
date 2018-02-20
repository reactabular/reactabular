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
      path: `${rootPath}/adjusting-colspan`,
      title: 'Adjusting Colspan',
      component: require('./adjusting-colspan.md')
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
    },
    {
      imports: { styled: require('styled-components') },
      path: `${rootPath}/styled-components`,
      title: 'Styled Components',
      component: require('./styled-components.md')
    },
    {
      path: `${rootPath}/header-body-aligned`,
      title: 'Align Sticky Header and Body',
      component: require('./header-body-aligned.md')
    },
    {
      path: `${rootPath}/fixed-columns`,
      title: 'Table With Fixed Columns',
      component: require('./fixed-columns.md')
    }
  ]
});
