import isEqual from 'deep-is';

function columnsAreEqual(oldColumns, newColumns) {
  return isEqual(filterCells(oldColumns), filterCells(newColumns));
}

function filterCells(columns) {
  return columns.map(column => {
    const { headerCell, bodyCell, ...rest } = column;

    return rest;
  });
}

export default columnsAreEqual;
