import get from 'lodash/get';

/**
 * Finds the first column matching given properties in the source within the columns tree
 * @param {Object[]} columns
 * @param {Object} source
 * @returns Object
 */
function getColumnByPath(columns, columnPath) {
  return get(columns, columnPath);
}

export default getColumnByPath;
