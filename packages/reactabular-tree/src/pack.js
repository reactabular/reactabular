import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import omit from 'lodash/omit';

const pack = ({
  idField = 'id',
  parentField = 'parent',
  childrenField = 'children'
} = {}) => (rows) => {
  if (!Array.isArray(rows)) {
    return [];
  }

  if (!rows.length) {
    return rows;
  }

  const ret = [];
  let previousParents;

  // Clone deep to guarantee immutability (implementation relies on
  // references)
  cloneDeep(rows).forEach((row) => {
    const rowParent = row[parentField];

    if (typeof rowParent !== 'undefined' && rowParent !== null) {
      // Check if the parent field matches the accumulated potential parents
      const foundParent = find(previousParents, { [idField]: rowParent });

      if (foundParent) {
        // Found the matching parent, set up children + push
        if (!foundParent[childrenField]) {
          foundParent[childrenField] = [];
        }

        foundParent[childrenField].push(omit(row, parentField));

        previousParents.push(
          last(foundParent[childrenField])
        );
      } else {
        console.warn('Invalid parent id', row, previousParents); // eslint-disable-line no-console
      }
    } else {
      ret.push(row);

      // No parents, flush lookup
      previousParents = [row];
    }
  });

  return ret;
};

function last(arr) {
  return arr[arr.length - 1];
}

export default pack;
