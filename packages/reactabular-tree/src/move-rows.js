import findIndex from 'lodash/findIndex';
import * as dnd from 'reactabular-dnd';

function moveRows({
  rows,
  sourceRowId,
  targetRowId,
  idField = 'id',
  parentField = 'parent'
} = {}) {
  let { rows: movedRows, sourceIndex, targetIndex } = dnd.moveRows({
    rows,
    sourceRowId,
    targetRowId
  });

  if (movedRows) {
    const sourceRow = rows[sourceIndex];
    const targetRow = rows[targetIndex];

    // Walk through the old row definition and patch parent relations of the new
    // one
    movedRows = rows.map((row, i) => {
      if (typeof row[parentField] === 'undefined') {
        return {
          ...movedRows[i],
          [parentField]: undefined
        };
      }

      // Find the index of the old parent
      const index = findIndex(rows, {
        [idField]: row[parentField]
      });

      // Figure out the new id based on that index
      const id = movedRows[index][idField];

      return {
        ...movedRows[i],
        [parentField]: id
      };
    });
  }

  return {
    rows: movedRows,
    sourceIndex,
    targetIndex
  };
}

export default moveRows;
