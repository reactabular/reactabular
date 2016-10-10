import cloneDeep from 'lodash/cloneDeep';
import defaultOrder from './default_order';

const byColumnsPrioritizeLastSorted = ({
  sortingColumns,
  sortingOrder = defaultOrder,
  selectedColumn = -1
}) => {
  let newSortingColumns = {};

  if (selectedColumn < 0) {
    return sortingColumns;
  }

  if (!sortingColumns) {
    return {
      [selectedColumn]: {
        direction: sortingOrder.FIRST,
        position: 0
      }
    };
  } else if ({}.hasOwnProperty.call(sortingColumns, selectedColumn)) {
    // Clone to avoid mutating the original structure
    newSortingColumns = cloneDeep(sortingColumns);

    const newSort = sortingOrder[newSortingColumns[selectedColumn].direction];
    const oldPosition = newSortingColumns[selectedColumn].position;

    if (newSort) { // sort direction is being updated
      // demote all previously higher-priority columns by 1
      // by incrementing their position
      Object.keys(newSortingColumns).forEach((k) => {
        const v = newSortingColumns[k];

        if (v.position < oldPosition) {
          v.position += 1;
        }
      });
      newSortingColumns[selectedColumn] = {
        direction: newSort,
        position: 0
      };
    } else {
      delete newSortingColumns[selectedColumn];

      // Update position of columns after the deleted one
      Object.keys(newSortingColumns).forEach((k) => {
        const v = newSortingColumns[k];

        if (v.position > oldPosition) {
          v.position -= 1;
        }
      });
    }

    return newSortingColumns;
  }

  // clone and insert new column at position 0, increment all others
  newSortingColumns = cloneDeep(sortingColumns);
  Object.keys(newSortingColumns).forEach((k) => {
    const v = newSortingColumns[k];
    v.position += 1;
  });

  return {
    ...newSortingColumns,
    [selectedColumn]: {
      direction: sortingOrder.FIRST,
      position: 0
    }
  };
};

export default byColumnsPrioritizeLastSorted;
