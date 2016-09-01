import getParents from './get-parents';

function filterTree(fieldName) {
  return rows => rows.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(rows, i);

    return parents.filter(
      parent => parent[fieldName]
    ).length === parents.length;
  });
}

export default filterTree;
