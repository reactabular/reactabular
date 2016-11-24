import { findIndex, omit, pick } from 'lodash';
import { moveRows } from 'reactabular-dnd';

const moveTreeRows = ({
  sourceRowId,
  targetRowId,
  retain = [],
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  let movedRows = moveRows({
    sourceRowId,
    targetRowId,
    idField
  })(rows);
  let cancelMoving = false;

  if (movedRows) {
    // Walk through the old row definition, patch parent relations and fields
    // of the new one
    movedRows = rows.map((row, i) => {
      if (typeof row[parentField] === 'undefined' || row[parentField] === null) {
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

      if (index < 0) {
        console.warn( // eslint-disable-line no-console
          'tree.moveRows - Failed to find the old parent', rows, row, idField, parentField
        );

        cancelMoving = true;

        return null;
      }

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

  if (cancelMoving) {
    return rows;
  }

  return movedRows;
};

export default moveTreeRows;
