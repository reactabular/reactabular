import { multipleColumns } from 'reactabular-search';
import getParents from './get-parents';

function searchTree({
  columns,
  query,
  parentField = 'parent'
} = {}) {
  // Track fetched parents to get them into the results only once
  const fetchedParents = {};

  return rows => [].concat(
    ...multipleColumns({
      columns,
      query
    })(rows).map((row) => {
      const rowParent = row[parentField];

      if (fetchedParents[rowParent]) {
        return row;
      }

      fetchedParents[rowParent] = true;

      return getParents({
        index: row._index,
        parentField
      })(rows).concat(row);
    }).filter(a => a)
  );
}

export default searchTree;
