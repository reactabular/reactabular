const byColumn = (sortingColumns, selectedColumn) => {
  const sortingColumn = sortingColumns && sortingColumns.length ?
    sortingColumns[0] :
    {};
  let sort = 'asc';

  if (sortingColumn.property === selectedColumn) {
    sort = sortingColumn.sort === 'asc' ? 'desc' : 'asc';
  }

  return [
    {
      property: selectedColumn,
      sort,
    },
  ];
};

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
byColumn.sort = (data, columns, sorter) => {
  if (!columns) {
    return data;
  }
  const column = columns[0]; // Sort based on the first one

  if (!column || !column.property || !column.sort) {
    return data;
  }

  return sorter(data, [column.property], [column.sort]);
};

export default byColumn;
