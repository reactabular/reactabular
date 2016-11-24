import { get, has } from 'lodash';

function nested({ column }) {
  return (rowData) => {
    const { property } = column;

    if (!property) {
      return {};
    }

    if (!has(rowData, property)) {
      console.warn( // eslint-disable-line no-console
        `resolve.nested - Failed to find "${property}" property from`,
        rowData
      );

      return {};
    }

    return {
      ...rowData,
      [property]: get(rowData, property)
    };
  };
}

export default nested;
