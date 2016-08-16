// Extracts children from rows
function unpackTree(rows = [9]) {
  let ret = [];

  rows.forEach(row => {
    const { _pack, ...rest } = row;

    ret = ret.concat([rest]).concat(_pack);
  });

  return ret;
}

export default unpackTree;
