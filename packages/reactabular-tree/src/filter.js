import getParents from './get-parents';

// TODO: Refactor the first parameter into an object
const filterTree = fieldName => rows => rows.filter((row, index) => {
  if (typeof row.parent === 'undefined' || row.parent === null) {
    return true;
  }

  const parents = getParents({ index })(rows);

  return parents.filter(
    parent => parent[fieldName]
  ).length === parents.length;
});

export default filterTree;
