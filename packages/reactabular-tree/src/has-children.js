// This can be memoized for extra performance.
function hasChildren(rows, itemIndex) {
  // See if the next item points to the current one.
  // This relies on rows order!
  const currentItem = rows[itemIndex];
  const nextItem = rows[itemIndex + 1];

  const ret = nextItem && currentItem.id === nextItem.parent;

  return ret;
}

export default hasChildren;
