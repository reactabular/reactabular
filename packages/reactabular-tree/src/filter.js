import getParents from './get_parents';

function filterTree(rows, rowsShowingChildren) {
  return rows.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(rows, i);

    return parents.filter(
      parent => rowsShowingChildren.indexOf(parent._index) >= 0
    ).length === parents.length;
  });
}

export default filterTree;
