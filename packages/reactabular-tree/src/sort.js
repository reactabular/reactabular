import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { sorter } from 'reactabular-sort';
import pack from './pack';
import unpack from './unpack';

function sortTree({
  columns,
  sortStrategy, // sort.byColumns, sort.byColumn
  sortingColumns,
  selectedColumn,
  rows
}) {
  let newSortingColumns;

  if (selectedColumn >= 0) {
    newSortingColumns = sortStrategy({
      sortingColumns,
      selectedColumn
    });
  }

  const newRows = sortTreeKernel({
    columns: columns.filter(column => column.visible),
    sortingColumns: newSortingColumns || sortingColumns,
    rows
  });

  return {
    filteredRows: newRows,
    sortingColumns: newSortingColumns || sortingColumns
  };
}

function sortTreeKernel({ columns, sortingColumns, rows }) {
  return compose(
    unpack,
    sorter({
      columns,
      sortingColumns,
      sort: orderBy
    }),
    pack
  )(rows);
}

export default sortTree;
