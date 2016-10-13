function getParents({
  index,
  parentField = 'parent'
} = {}) {
  return (rows) => {
    const parents = [];
    let currentIndex = index;
    let cell = rows[index];
    let previousParent;

    if (
      !cell ||
      typeof cell[parentField] === 'undefined' ||
      cell[parentField] === null
    ) {
      return parents;
    }

    while (cell) {
      if (cell[parentField] === null) {
        if (previousParent !== cell[parentField]) {
          parents.unshift(cell);
        }

        break;
      }
      if (typeof cell[parentField] !== 'undefined') {
        if (typeof previousParent !== 'undefined' && previousParent !== cell[parentField]) {
          parents.unshift(cell);
        }
      } else {
        if (typeof previousParent !== 'undefined') {
          parents.unshift(cell);
        }

        break;
      }

      currentIndex -= 1;

      previousParent = cell[parentField];
      cell = rows[currentIndex];
    }

    return parents;
  };
}

export default getParents;
