import defaultOrder from './default_order';

const byColumn = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn
}) => {
  let sort = sortingOrder.FIRST;

  if (sortingColumns && sortingColumns.hasOwnProperty(selectedColumn)) {
    sort = sortingOrder[sortingColumns[selectedColumn].direction];

    if (!sort) {
      return {};
    }
  }

  return {
    [selectedColumn]: {
      direction: sort,
      position: 0
    }
  };
};

export default byColumn;
