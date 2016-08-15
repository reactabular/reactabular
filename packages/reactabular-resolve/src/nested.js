import get from 'lodash/get';
import has from 'lodash/has';

function nested({ rowData, column }) {
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
}

export default nested;
