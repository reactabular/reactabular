import {
  sort, resolve, highlight, search
} from 'reactabular';
import * as tree from 'reactabular-tree';
import { compose } from 'redux';

function processRows({
  query,
  sortingColumns,
  idField,
  parentField,
  columns,
  rows
}) {
  return compose(
    tree.filter({ fieldName: 'showingChildren', parentField }),
    tree.sort({
      columns,
      idField,
      sortingColumns,
      strategy: sort.strategies.byProperty
    }),
    highlight.highlighter({ columns, matches: search.matches, query }),
    tree.search({ columns, query, idField, parentField }),
    resolve.resolve({
      columns,
      method: ({ rowData, rowIndex, column }) => resolve.byFunction('cell.resolve')({
        rowData: resolve.nested({
          rowData: resolve.index({ rowData, rowIndex }),
          column
        }),
        column
      })
    })
  )(rows);
}

export default processRows;
