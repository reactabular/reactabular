const collapseAll = ({ property = 'showingChildren' } = {}) => rows => (
  rows.map(row => ({ ...row, [property]: false }))
);

export default collapseAll;
