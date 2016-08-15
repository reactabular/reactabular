// This can be memoized for extra performance.
function getLevel(rows, itemIndex) {
  // Get parent of parent till there is no parent -> level.
  // This relies on rows order!
  let level = 0;
  let currentIndex = itemIndex;
  let cell = rows[itemIndex];
  let previousParent;

  while (cell) {
    if (cell.parent) {
      if (previousParent !== cell.parent) {
        level++;
      }
    } else {
      break;
    }

    currentIndex--;

    previousParent = cell.parent;
    cell = rows[currentIndex];
  }

  return level;
}

export default getLevel;
