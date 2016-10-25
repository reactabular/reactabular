import getParents from './get-parents';

// TODO: Refactor the first parameter into an object
const filterTree = fieldName => rows => rows.filter((item, index) => {
  if (!item.parent) {
    return true;
  }

  const parents = getParents({ index })(rows);

  // XXX: this can fail if parent[fieldName] returns zero!
  return parents.filter(
    parent => parent[fieldName]
  ).length === parents.length;
});

export default filterTree;
