import {
  sort, resolve
} from 'reactabular';
import * as search from 'searchtabular';
import * as tree from 'reactabular-tree';
import { compose } from 'redux';

function processRows({
  movingRow,
  query,
  sortingColumns,
  idField,
  parentField,
  columns
}) {
  // Moving rows is allowed only when there's no sort/search so we can skip a few
  // operations there to speed it up.
  return compose(
    tree.filter({ fieldName: 'showingChildren', parentField }),
    movingRow ? id : tree.sort({
      columns,
      idField,
      sortingColumns,
      strategy: sort.strategies.byProperty
    }),
    movingRow ? id : search.highlighter({ columns, matches: search.matches, query }),
    movingRow ? id : tree.search({ columns, query, idField, parentField }),
    resolve.resolve({
      columns,
      method: extra => compose(
        resolve.index(extra),
        resolve.byFunction('cell.resolve')(extra),
        resolve.nested(extra)
      )
    })
  );
}

function id(a) { return a; }

export default processRows;
