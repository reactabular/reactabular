const byColumn = (sortingColumns, selectedColumn) => {
  const sortingColumn = sortingColumns ? sortingColumns[0] : {};
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

  return sorter(data, [column.property], [column.sort]);
};

export default byColumn;
