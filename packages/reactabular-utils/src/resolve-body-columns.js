function resolveBodyColumns(columns) {
  let ret = [];

  columns.forEach((column) => {
    // If a column has children, skip cell specific configuration
    if (column.children && column.children.length) {
      ret = ret.concat(resolveBodyColumns(column.children));
    } else {
      ret.push(column);
    }
  });

  return ret;
}

export default resolveBodyColumns;
