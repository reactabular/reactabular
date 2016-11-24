function resolve({ columns, method }) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }
  if (!method) {
    throw new Error('resolve - Missing method!');
  }

  return (rows = []) => rows.map((rowData, rowIndex) => {
    let ret = {};

    columns.forEach((column) => {
      const result = method({
        rowIndex,
        column
      })(rowData);

      delete result.undefined;

      ret = {
        ...rowData,
        ...ret,
        ...result
      };
    });

    return ret;
  });
}

export default resolve;
