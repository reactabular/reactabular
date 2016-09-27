const expandAll = (rows, property = 'showingChildren') => (
  rows.map(row => ({ ...row, [property]: true }))
);

export default expandAll;
