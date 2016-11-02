import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import * as dnd from 'reactabular-dnd';

function moveRows({
  rows,
  sourceRowId,
  targetRowId,
  retain = [],
  idField = 'id',
  parentField = 'parent'
} = {}) {
  const moved = dnd.moveRows({
    rows,
    sourceRowId,
    targetRowId
  });
  const { sourceIndex, targetIndex } = moved;
  let movedRows = moved.rows;

  if (movedRows) {
    // Walk through the old row definition, patch parent relations and fields
    // of the new one
    movedRows = rows.map((row, i) => {
      if (typeof row[parentField] === 'undefined') {
        return {
          ...omit(movedRows[i], retain),
          ...pick(row, retain),
          [idField]: movedRows[i][idField],
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
        ...omit(movedRows[i], retain),
        ...pick(row, retain),
        [idField]: movedRows[i][idField],
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
