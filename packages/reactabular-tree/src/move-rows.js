import findIndex from 'lodash/findIndex';
import * as dnd from 'reactabular-dnd';
import getImmediateChildren from './/get-immediate-children';

function moveRows({
  rows,
  sourceRowId,
  targetRowId,
  idField = 'id',
  parentField = 'parent'
} = {}) {
  const { rows: movedRows, sourceIndex, targetIndex } = dnd.moveRows({
    rows,
    sourceRowId,
    targetRowId
  });

  if (movedRows) {
    const sourceRow = rows[sourceIndex];
    const targetRow = rows[targetIndex];
    const sourceChildren = getImmediateChildren({
      index: findIndex(rows, { [idField]: sourceRowId })
    })(rows);
    const targetChildren = getImmediateChildren({
      index: findIndex(rows, { [idField]: targetRowId })
    })(rows);

    // Change source children point at the new parent
    sourceChildren.forEach((child) => {
      child[parentField] = targetRow.id; // eslint-disable-line no-param-reassign
    });

    // Change target children point at the new parent
    targetChildren.forEach((child) => {
      child[parentField] = sourceRow.id; // eslint-disable-line no-param-reassign
    });

    // Swap parents
    const tmpParent = sourceRow[parentField];
    sourceRow[parentField] = targetRow[parentField];
    targetRow[parentField] = tmpParent;

    // Swap showingChildren state
    // XXX: This needs to be exposed somehow
    /*
    const tmpShowingChildren = sourceRow.showingChildren;
    sourceRow.showingChildren = targetRow.showingChildren;
    targetRow.showingChildren = tmpShowingChildren;
    */
  }

  return {
    rows: movedRows,
    sourceIndex,
    targetIndex
  };
}

export default moveRows;
