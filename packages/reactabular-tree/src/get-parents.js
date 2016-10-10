function getParents({
  rows,
  index,
  parent = 'parent'
}) {
  const parents = [];
  let currentIndex = index;
  let cell = rows[index];
  let previousParent;

  while (cell) {
    if (cell[parent]) {
      if (typeof previousParent !== 'undefined' && previousParent !== cell[parent]) {
        parents.unshift(cell);
      }
    } else {
      if (typeof previousParent !== 'undefined') {
        parents.unshift(cell);
      }

      break;
    }

    currentIndex -= 1;

    previousParent = cell[parent];
    cell = rows[currentIndex];
  }

  return parents;
}

export default getParents;
