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
  if (!sort) {
    return 'asc';
  } else if (sort === 'asc') {
    return 'desc';
  }

  return null;
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
