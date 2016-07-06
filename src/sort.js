import find from 'lodash/find';
import get from 'lodash/get';

const defaultOrder = {
  FIRST: 'asc',
  '': 'asc',
  asc: 'desc',
  desc: ''
};

const byColumn = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn
}) => {

  let sort = sortingOrder.FIRST;

  if (sortingColumns && sortingColumns.hasOwnProperty(selectedColumn)) {
    sort = sortingOrder[sortingColumns[selectedColumn]];

    if (!sort) {
      return {};
    }
  }

  return {
    [selectedColumn]: sort
  };
};

const byColumns = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn
}) => {
  let newSortingColumns = {};

  if (!sortingColumns) {
    return {
     [selectedColumn]: sortingOrder.FIRST
    }/*[{
      columnIndex: selectedColumn,
      sort: sortingOrder.FIRST
    }]*/;
  } else if (sortingColumns.hasOwnProperty(selectedColumn)) {
    // Clone to avoid mutating the original structure
    //newSortingColumns = sortingColumns.map(col => ({ ...col }));
    newSortingColumns = {...sortingColumns};
    const newSort = sortingOrder[newSortingColumns[selectedColumn]];

    if (newSort) {
      newSortingColumns[selectedColumn] = newSort;
    } else {
      delete newSortingColumns[selectedColumn];
    }
    return newSortingColumns;
  }

  return {...sortingColumns, 
    [selectedColumn]: sortingOrder.FIRST};
};

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
const sorter = ({
  columns = {},
  sortingColumns,
  sort
} = {}) => data => {
  if (!sortingColumns) {
    return data;
  }

  const columnIndexList = [];
  const orderList = [];

  Object.keys(sortingColumns).forEach((columnIndex) => { // eslint-disable-line no-shadow
    const sort = sortingColumns[columnIndex];
    const realColumn = columns[columnIndex];
    const resolver = realColumn && realColumn.cell && realColumn.cell.resolve || (a => a);

    columnIndexList.push(row => {
      const value = get(row, realColumn.cell.property);
      const resolvedValue = resolver(value, { rowData: row, property: realColumn.cell.property });

      if (resolvedValue && resolvedValue.toLowerCase) {
        return resolvedValue.toLowerCase();
      }

      return value;
    });

    orderList.push(sort);
  });

  return sort(data, columnIndexList, orderList);
};

export default {
  byColumn,
  byColumns,
  sorter
};
