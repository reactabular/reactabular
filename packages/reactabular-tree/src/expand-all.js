const expandAll = ({ property = 'showingChildren' } = {}) => rows => (
  rows.map(row => ({ ...row, [property]: true }))
);

export default expandAll;
