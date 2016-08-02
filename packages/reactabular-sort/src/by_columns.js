import defaultOrder from './default_order';

const byColumns = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn
}) => {
  let newSortingColumns = {};

  if (!sortingColumns) {
    return {
      [selectedColumn]: {
        direction: sortingOrder.FIRST,
        position: 0
      }
    };
  } else if ({}.hasOwnProperty.call(sortingColumns, selectedColumn)) {
    // Clone to avoid mutating the original structure
    newSortingColumns = { ...sortingColumns };

    const newSort = sortingOrder[newSortingColumns[selectedColumn].direction];

    if (newSort) {
      newSortingColumns[selectedColumn] = {
        direction: newSort,
        position: newSortingColumns[selectedColumn].position
      };
    } else {
      const oldPosition = newSortingColumns[selectedColumn].position;

      delete newSortingColumns[selectedColumn];

      // Update position of columns after the deleted one
      Object.keys(newSortingColumns).forEach(k => {
        const v = newSortingColumns[k];

        if (v.position > oldPosition) {
          v.position--;
        }
      });
    }

    return newSortingColumns;
  }

  return {
    ...sortingColumns,
    [selectedColumn]: {
      direction: sortingOrder.FIRST,
      position: Object.keys(sortingColumns).length
    }
  };
};

export default byColumns;
