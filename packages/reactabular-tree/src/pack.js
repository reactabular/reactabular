// Folds children inside root parents
const packTree = ({
  parent = 'parent'
} = {}) => (rows) => {
  const ret = [];
  let pack = [];
  let previousParent;

  rows.forEach((row) => {
    if (typeof row[parent] !== 'undefined') {
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

  if (pack.length && previousParent) {
    previousParent._pack = pack;
  }

  return ret;
};

export default packTree;
