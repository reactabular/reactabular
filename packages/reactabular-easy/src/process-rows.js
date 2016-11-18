import {
  sort, resolve, highlight, search
} from 'reactabular';
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
  return compose(
    tree.filter({ fieldName: 'showingChildren', parentField }),
    movingRow ? id : tree.sort({
      columns,
      idField,
      sortingColumns,
      strategy: sort.strategies.byProperty
    }),
    movingRow ? id : highlight.highlighter({ columns, matches: search.matches, query }),
    tree.search({ columns, query, idField, parentField }),
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
