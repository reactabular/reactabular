import uniq from 'lodash/uniq';
import { multipleColumns } from 'reactabular-search';
import getChildren from './get-children';
import getParents from './get-parents';

function searchTree({
  columns,
  query,
  idField = 'id',
  parentField = 'parent'
} = {}) {
  return (rows) => {
    // Track fetched parents to get them into the results only once
    const fetchedParents = {};

    if (!Object.keys(query).length) {
      return rows;
    }

    return uniq([].concat(
      ...multipleColumns({
        columns,
        query
      })(rows).map((row) => {
        const rowParent = row[parentField];

        if (fetchedParents[rowParent]) {
          return row;
        }

        fetchedParents[rowParent] = true;

        const children = getChildren({ index: row._index, idField, parentField })(rows);
        const parents = getParents({ index: row._index, parentField })(rows);

        return parents.concat(row).concat(children);
      }).filter(a => a)
    ));
  };
}

export default searchTree;
