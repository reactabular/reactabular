const collapseAll = (rows, property = 'showingChildren') => (
  rows.map(row => ({ ...row, [property]: false }))
);

export default collapseAll;
