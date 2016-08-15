import getParents from './get_parents';

function filterTree(rows) {
  return rows.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(rows, i);

    return parents.filter(parent => parent.showChildren).length === parents.length;
  });
}

export default filterTree;
