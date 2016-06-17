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

    newSortingColumns[index] = {
      property: selectedColumn,
      sort: cycleSort(newSortingColumns[index].sort),
    };

    return newSortingColumns;
  }

  return [...sortingColumns, {
    property: selectedColumn,
    sort: 'asc',
  }];
};

function cycleSort(sort) {
  if (!sort) {
    return 'asc';
  } else if (sort === 'asc') {
    return 'desc';
  }

  return '';
}

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
byColumns.sort = (data, columns, sorter) => {
  if (!columns) {
    return data;
  }

  const propertyList = [];
  const orderList = [];

  columns.forEach((column) => {
    propertyList.push(column.property);
    orderList.push(column.sort);
  });

  return sorter(data, propertyList, orderList);
};

export default byColumns;
