function getLevel({
  rows,
  index,
  parent = 'parent'
}) {
  // Get parent of parent till there is no parent -> level.
  // This relies on rows order!
  let level = 0;
  let currentIndex = index;
  let cell = rows[index];
  let previousParent;

  while (cell) {
    if (cell[parent]) {
      if (previousParent !== cell[parent]) {
        level++;
      }
    } else {
      break;
    }

    currentIndex--;

    previousParent = cell[parent];
    cell = rows[currentIndex];
  }

  return level;
}

export default getLevel;
