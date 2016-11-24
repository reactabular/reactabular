function columnChildren({
  columns,
  childrenField = 'children'
}) {
  if (!columns) {
    throw new Error('resolve.columnChildren - Missing columns!');
  }

  let ret = [];

  columns.forEach((column) => {
    // If a column has children, skip cell specific configuration
    if (column[childrenField] && column[childrenField].length) {
      ret = ret.concat(
        columnChildren({
          columns: column[childrenField],
          childrenField
        })
      );
    } else {
      ret.push(column);
    }
  });

  return ret;
}

export default columnChildren;
