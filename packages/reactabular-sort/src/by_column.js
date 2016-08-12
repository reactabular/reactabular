import defaultOrder from './default_order';

const byColumn = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn = -1
}) => {
  let sort = sortingOrder.FIRST;

  if (selectedColumn < 0) {
    return sortingColumns;
  }

  if (sortingColumns && {}.hasOwnProperty.call(sortingColumns, selectedColumn)) {
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
