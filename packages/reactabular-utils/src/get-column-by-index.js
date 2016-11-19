import resolveBodyColumns from './resolve-body-columns';

/**
 * Finds the first column matching given index in the source within the columns tree
 * @param {Object[]} columns
 * @param {number} index
 * @returns Object
 */
function getColumnByIndex(columns, index) {
  return resolveBodyColumns(columns)[index];
}

export default getColumnByIndex;
