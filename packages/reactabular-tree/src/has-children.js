const hasChildren = ({
  index,
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  // See if the next item points to the current one.
  // This relies on rows order!
  const currentItem = rows[index];
  const nextItem = rows[index + 1];

  return !!(nextItem && currentItem[idField] === nextItem[parentField]);
};

export default hasChildren;
