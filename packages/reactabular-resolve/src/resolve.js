import { resolveBodyColumns } from 'reactabular-utils';

function resolve({ columns, method }) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }
  if (!method) {
    throw new Error('resolve - Missing method!');
  }

  const resolvedColumns = resolveBodyColumns(columns);

  return rows => rows.map(row => {
    let ret = {};

    resolvedColumns.forEach(column => {
      ret = {
        ...ret,
        ...method(row, column)
      };
    });

    return ret;
  });
}

export default resolve;
