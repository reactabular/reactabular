import get from 'lodash/get';

const byColumn = (sortingColumns, selectedColumn) => {
  const sortingColumn = sortingColumns && sortingColumns.length ?
    sortingColumns[0] :
    {};
  let sort = 'asc';

  if (sortingColumn.property === selectedColumn) {
    sort = cycleSort(sortingColumn.sort);

    if (!sort) {
      return [];
    }
  }

  return [
    {
      property: selectedColumn,
      sort,
    },
  ];
};

const byColumns = (sortingColumns, selectedColumn) => {
  const index = sortingColumns && sortingColumns.map(
    c => c.property
  ).indexOf(selectedColumn);
  let newSortingColumns = [];

  if (!sortingColumns) {
    return [{
      property: selectedColumn,
      sort: 'asc',
    }];
  } else if (index >= 0) {
    newSortingColumns = sortingColumns;

    const newSort = cycleSort(newSortingColumns[index].sort);

    if (newSort) {
      newSortingColumns[index] = {
        property: selectedColumn,
        sort: newSort,
      };
    } else {
      newSortingColumns.splice(index, 1);
    }

    return newSortingColumns;
  }

  return [...sortingColumns, {
    property: selectedColumn,
    sort: 'asc',
  }];
};

function cycleSort(sort) {
  return sort === 'asc' && 'desc';
}

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
const sorter = (data, columns, sort) => {
  if (!columns) {
    return data;
  }

  const propertyList = [];
  const orderList = [];

  columns.forEach((column) => {
    propertyList.push(row => {
      const value = get(row, column.property);

      if (value.toLowerCase) {
        return value.toLowerCase();
      }

      return value;
    });
    orderList.push(column.sort);
  });

  return sort(data, propertyList, orderList);
};

export default {
  byColumn,
  byColumns,
  sorter,
};
