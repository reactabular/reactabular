import { get } from 'lodash';

function byFunction(path) {
  return ({ column = {} }) => (rowData) => {
    const { property } = column;

    if (!property) {
      return rowData;
    }

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

export default byFunction;
