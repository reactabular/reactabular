const getImmediateChildren = ({
  index,
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  if (!rows.length) {
    return [];
  }

  // See if the next item points to the current one.
  // This relies on rows order!
  let currentIndex = index;
  let currentItem = rows[currentIndex];
  let nextItem = rows[currentIndex + 1];

  if (!currentItem) {
    return [];
  }

  const originalParent = currentItem[idField];
  const previousParents = {
    [originalParent]: true
  };
  const ret = [];

  while (nextItem && previousParents[nextItem[parentField]]) {
    if (originalParent === nextItem[parentField]) {
      ret.push(nextItem);
    }

    previousParents[nextItem[idField]] = true;

    currentIndex += 1;
    currentItem = rows[currentIndex];
    nextItem = rows[currentIndex + 1];
  }

  return ret;
};

export default getImmediateChildren;
