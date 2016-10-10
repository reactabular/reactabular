// Extracts children from rows
function unpackTree(rows = []) {
  let ret = [];

  rows.forEach((row) => {
    const { _pack, ...rest } = row;

    ret = ret.concat([rest]).concat(_pack);
  });

  return ret.filter(a => a);
}

export default unpackTree;
