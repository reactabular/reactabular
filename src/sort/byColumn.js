const byColumn = (sortingColumn, selectedColumn) => {
  let sort = 'asc';

  if (sortingColumn && sortingColumn.property === selectedColumn) {
    sort = sortingColumn.sort === 'asc' ? 'desc' : 'asc';
  }

  return {
    property: selectedColumn,
    sort,
  };
};

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
byColumn.sort = (data, column, sorter) => {
  if (!column) {
    return data;
  }

  return sorter(data, [column.property], [column.sort]);
};

export default byColumn;
