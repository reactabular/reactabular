import get from 'lodash/get';

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

export default byFunction;
