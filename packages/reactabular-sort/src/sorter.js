import defaultStrategy from './default-strategy';

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
const sorter = ({
  columns,
  sortingColumns,
  sort,
  strategy = defaultStrategy
} = {}) => (data) => {
  if (!columns) {
    throw new Error('sort.sorter - Missing columns!');
  }

  if (!sortingColumns) {
    return data;
  }

  const columnIndexList = new Array(sortingColumns.length);
  const orderList = new Array(sortingColumns.length);

  Object.keys(sortingColumns).forEach((sortingColumnKey) => {
    const realColumn = strategy.getColumn(columns, sortingColumnKey) || {};
    const sortingColumn = sortingColumns[sortingColumnKey];

    columnIndexList[sortingColumn.position] = (row) => {
      const property = realColumn.property;
      const value = row[property];
      // Pick resolved value by convention
      const resolvedValue = row[`_${property}`] || value;

      if (resolvedValue && resolvedValue.toLowerCase) {
        return resolvedValue.toLowerCase();
      }

      if (value && value.toLowerCase) {
        return value.toLowerCase();
      }

      return value;
    };

    orderList[sortingColumn.position] = sortingColumn.direction;
  });

  return sort(data, columnIndexList, orderList);
};

export default sorter;
