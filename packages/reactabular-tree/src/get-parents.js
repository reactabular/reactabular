function getParents({
  rows,
  index,
  id = 'id',
  parent = 'parent'
}) {
  const parents = [];
  let currentIndex = index;
  let cell = rows[index];
  let previousParent;

  while (cell) {
    if (cell[id] === previousParent) {
      parents.push(cell);

      if (!cell[parent]) {
        break;
      }
    }

    if (cell[parent] !== previousParent) {
      previousParent = cell[parent];
    }

    if (!cell[parent]) {
      break;
    }

    currentIndex--;

    cell = rows[currentIndex];
  }

  return parents;
}

export default getParents;
