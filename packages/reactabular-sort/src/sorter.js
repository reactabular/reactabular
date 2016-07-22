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

  Object.keys(sortingColumns).forEach(columnIndex => {
    const realColumn = columns[columnIndex] || { cell: {} };
    const sortingColumn = sortingColumns[columnIndex];

    columnIndexList[sortingColumn.position] = row => {
      const property = realColumn.cell.property;
      const value = row[property];
      // Pick resolved value by convention
      const resolvedValue = row[`_${property}`] || value;

      if (resolvedValue.toLowerCase) {
        return resolvedValue.toLowerCase();
      }

      if (value.toLowerCase) {
        return value.toLowerCase();
      }

      return value;
    };

    orderList[sortingColumn.position] = sortingColumn.direction;
  });

  return sort(data, columnIndexList, orderList);
};

export default sorter;
