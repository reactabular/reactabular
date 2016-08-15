// Folds children inside root parents
function packTree(rows) {
  const ret = [];
  let pack = [];
  let previousParent;

  rows.forEach(row => {
    if (row.parent) {
      pack.push(row);
    } else {
      ret.push(row);

      if (previousParent && pack) {
        previousParent._pack = pack;

        pack = [];
      }

      previousParent = row;
    }
  });

  if (pack) {
    previousParent._pack = pack;
  }

  return ret;
}

export default packTree;
