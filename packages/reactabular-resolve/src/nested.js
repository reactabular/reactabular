import get from 'lodash/get';
import has from 'lodash/has';

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

export default nested;
