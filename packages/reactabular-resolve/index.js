import get from 'lodash/get';
import has from 'lodash/has';
import { resolveBodyColumns } from '../utils';

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

function nested(row, { cell: { property } = {} }) {
  if (!property) {
    return {};
  }

  if (!has(row, property)) {
    console.warn(`resolve.nested - Failed to find "${property}" property from`, row); // eslint-disable-line max-len, no-console

    return {};
  }

  return {
    [property]: get(row, property)
  };
}

function byFunction(path) {
  return (rowData, column) => {
    const { cell: { property } = {} } = column;
    const value = rowData[property];
    const resolver = get(column, path);
    const ret = {
      ...rowData,
      [property]: value
    };

    if (resolver) {
      ret[`_${property}`] = resolver(value, {
        property,
        rowData
      });
    }

    return ret;
  };
}

export default {
  resolve,
  nested,
  byFunction
};
