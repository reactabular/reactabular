import { mergeClassNames } from './table/utils';

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
    sort = sortingOrder[sortingColumns[selectedColumn].direction];

    if (!sort) {
      return {};
    }
  }

  return {
    [selectedColumn]: {
      direction: sort,
      position: 0
    }
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
      [selectedColumn]: {
        direction: sortingOrder.FIRST,
        position: 0
      }
    };
  } else if (sortingColumns.hasOwnProperty(selectedColumn)) {
    // Clone to avoid mutating the original structure
    newSortingColumns = { ...sortingColumns };

    const newSort = sortingOrder[newSortingColumns[selectedColumn].direction];

    if (newSort) {
      newSortingColumns[selectedColumn] = {
        direction: newSort,
        position: newSortingColumns[selectedColumn].position
      };
    } else {
      const oldPosition = newSortingColumns[selectedColumn].position;

      delete newSortingColumns[selectedColumn];

      // Update position of columns after the deleted one
      Object.keys(newSortingColumns).forEach(k => {
        const v = newSortingColumns[k];

        if (v.position > oldPosition) {
          v.position--;
        }
      });
    }

    return newSortingColumns;
  }

  return {
    ...sortingColumns,
    [selectedColumn]: {
      direction: sortingOrder.FIRST,
      position: Object.keys(sortingColumns).length
    }
  };
};

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
const sorter = ({
  columns,
  sortingColumns,
  sort
} = {}) => data => {
  if (!columns) {
    throw new Error('sort.sorter - Missing columns!');
  }

  if (!sortingColumns) {
    return data;
  }

  const columnIndexList = new Array(sortingColumns.length);
  const orderList = new Array(sortingColumns.length);

  // XXX: similar logic as for search and highlight -> share
  Object.keys(sortingColumns).forEach(columnIndex => {
    const realColumn = columns[columnIndex] || { cell: {} };
    const resolver = realColumn.cell && realColumn.cell.resolve || (a => a);
    const sortingColumn = sortingColumns[columnIndex];

    columnIndexList[sortingColumn.position] = row => {
      const value = row[realColumn.cell.property];
      const resolvedValue = resolver(value, {
        rowData: row,
        property: realColumn.cell.property
      });

      if (resolvedValue && resolvedValue.toLowerCase) {
        return resolvedValue.toLowerCase();
      }

      return value;
    };

    orderList[sortingColumn.position] = sortingColumn.direction;
  });

  return sort(data, columnIndexList, orderList);
};

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => (_value, { columnIndex }, { className, ...props } = {}) => {
  const columns = getSortingColumns();
  let headerClass = 'sort sort-none';

  // Check against undefined to allow zero
  if (columns[columnIndex] !== undefined) {
    headerClass = `sort sort-${columns[columnIndex].direction}`;
  }

  return {
    ...props,
    className: mergeClassNames(className, headerClass),
    onClick: () => onSort(columnIndex)
  };
};

export default {
  byColumn,
  byColumns,
  sorter,
  sort
};
