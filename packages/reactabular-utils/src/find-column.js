import find from 'lodash/find';
import isMatch from 'lodash/isMatch';

/**
 * Finds the first column matching given properties in the source within the columns tree
 * @param {Object[]} columns
 * @param {Object} source
 * @returns Object
 */
function findColumn(columns, source) {
  let children = [];
  const match = find(columns, (column) => {
    const columnMatch = isMatch(column, source);
    if (!columnMatch && column.children) {
      children = children.concat(children, column.children);
    }
    return columnMatch;
  });

  return match || (children.length && findColumn(children, source));
}

export default findColumn;
