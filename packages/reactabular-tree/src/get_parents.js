// This can be memoized for extra performance.
function getParents(rows, itemIndex) {
  const parents = [];
  let currentIndex = itemIndex;
  let cell = rows[itemIndex];
  let previousParent;

  while (cell) {
    if (cell.id === previousParent) {
      parents.push(cell);

      if (!cell.parent) {
        break;
      }
    }

    if (cell.parent !== previousParent) {
      previousParent = cell.parent;
    }

    currentIndex--;

    cell = rows[currentIndex];
  }

  return parents;
}

export default getParents;
