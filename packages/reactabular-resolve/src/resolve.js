import { resolveBodyColumns } from 'reactabular-utils';

function resolve({ columns, method }) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }
  if (!method) {
    throw new Error('resolve - Missing method!');
  }

  const resolvedColumns = resolveBodyColumns(columns);

  return (rows = []) => rows.map((rowData, rowIndex) => {
    let ret = {};

    resolvedColumns.forEach((column) => {
      const result = method({
        rowData,
        rowIndex,
        column
      });

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
