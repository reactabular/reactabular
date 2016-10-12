const packTree = ({
  parentField = 'parent',
  childrenField = 'children'
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
        previousParent[childrenField] = pack;

        pack = [];
      }

      previousParent = row;
    }
  });

  if (pack.length && previousParent) {
    previousParent[childrenField] = pack;
  }

  return ret;
};

export default packTree;
