import * as resolve from 'table-resolver';
import * as search from 'searchtabular';
import * as sort from 'sortabular';
import * as tree from 'treetabular';
import { compose } from 'redux';
import { orderBy } from 'lodash';

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
    movingRow ? id : tree.wrap({
      operations: [
        sort.sorter({
          columns,
          sortingColumns,
          sort: orderBy,
          strategy: sort.strategies.byProperty
        })
      ],
      idField
    }),
    movingRow ? id : search.highlighter({ columns, matches: search.matches, query }),
    movingRow ? id : tree.search({
      operation: search.multipleColumns({ columns, query }),
      idField,
      parentField
    }),
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
