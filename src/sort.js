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
  const sortingColumn = sortingColumns && sortingColumns.length ?
    sortingColumns[0] :
    {};
  let sort = sortingOrder.FIRST;

  if (sortingColumn.property === selectedColumn) {
    sort = sortingOrder[sortingColumn.sort];

    if (!sort) {
      return [];
    }
  }

  return [
    {
      property: selectedColumn,
      sort
    }
  ];
};

const byColumns = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn
}) => {
  const index = sortingColumns && sortingColumns.map(
    c => c.property
  ).indexOf(selectedColumn);
  let newSortingColumns = [];

  if (!sortingColumns) {
    return [{
      property: selectedColumn,
      sort: sortingOrder.FIRST
    }];
  } else if (index >= 0) {
    // Clone to avoid mutating the original structure
    newSortingColumns = sortingColumns.map(col => ({ ...col }));

    const newSort = sortingOrder[newSortingColumns[index].sort];

    if (newSort) {
      newSortingColumns[index] = {
        property: selectedColumn,
        sort: newSort
      };
    } else {
      newSortingColumns.splice(index, 1);
    }

    return newSortingColumns;
  }

  return [...sortingColumns, {
    property: selectedColumn,
    sort: sortingOrder.FIRST
  }];
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

  const propertyList = [];
  const orderList = [];

  sortingColumns.forEach(({ property, sort }) => { // eslint-disable-line no-shadow
    const realColumn = find(columns, { cell: { property } });
    const resolver = realColumn && realColumn.cell && realColumn.cell.resolve || (a => a);

    propertyList.push(row => {
      const value = get(row, property);
      const resolvedValue = resolver(value, { rowData: row, property });

      if (resolvedValue && resolvedValue.toLowerCase) {
        return resolvedValue.toLowerCase();
      }

      return value;
    });

    orderList.push(sort);
  });

  return sort(data, propertyList, orderList);
};

export default {
  byColumn,
  byColumns,
  sorter
};
