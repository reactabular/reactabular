// Folds children inside root parents
const packTree = ({
  parentField = 'parent'
} = {}) => (rows) => {
  const ret = [];
  let pack = [];
  let previousParent;

  rows.forEach((row) => {
    if (typeof row[parentField] !== 'undefined') {
      pack.push(row);
    } else {
      ret.push(row);

      if (previousParent && pack && pack.length) {
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
