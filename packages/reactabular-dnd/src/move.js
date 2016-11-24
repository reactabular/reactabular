import { findIndex } from 'lodash';

function moveChildrenLabels(columns, { sourceLabel, targetLabel }) {
  const sourceIndex = findIndex(
    columns,
    column => (
      findIndex(
        column.children,
        { header: { label: sourceLabel } }
      ) >= 0
    )
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    column => (
      findIndex(
        column.children,
        { header: { label: targetLabel } }
      ) >= 0
    )
  );

  if (targetIndex < 0) {
    return null;
  }

  // Allow drag and drop only within the same column
  if (sourceIndex !== targetIndex) {
    return null;
  }

  const movedChildren = moveLabels(columns[sourceIndex].children, {
    sourceLabel, targetLabel
  });

  if (!movedChildren) {
    return null;
  }

  return {
    target: sourceIndex,
    columns: movedChildren.columns
  };
}

function moveLabels(columns, { sourceLabel, targetLabel }) {
  if (!columns) {
    throw new Error('dnd.moveLabels - Missing columns!');
  }

  const sourceIndex = findIndex(
    columns,
    { header: { label: sourceLabel } }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    { header: { label: targetLabel } }
  );

  if (targetIndex < 0) {
    return null;
  }

  const movedColumns = move(columns, sourceIndex, targetIndex);

  return {
    source: movedColumns[sourceIndex],
    target: movedColumns[targetIndex],
    columns: movedColumns
  };
}

const moveRows = ({
  sourceRowId,
  targetRowId,
  idField = 'id'
} = {}) => (rows) => {
  const sourceIndex = findIndex(
    rows,
    { [idField]: sourceRowId }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    rows,
    { [idField]: targetRowId }
  );

  if (targetIndex < 0) {
    return null;
  }

  return move(rows, sourceIndex, targetIndex);
};

function move(data, sourceIndex, targetIndex) {
  // Idea
  // a, b, c, d, e -> move(b, d) -> a, c, d, b, e
  // a, b, c, d, e -> move(d, a) -> d, a, b, c, e
  // a, b, c, d, e -> move(a, d) -> b, c, d, a, e
  const sourceItem = data[sourceIndex];

  // 1. detach - a, c, d, e - a, b, c, e, - b, c, d, e
  const ret = data.slice(0, sourceIndex).concat(
    data.slice(sourceIndex + 1)
  );

  // 2. attach - a, c, d, b, e - d, a, b, c, e - b, c, d, a, e
  return ret.slice(0, targetIndex).concat([sourceItem]).concat(
    ret.slice(targetIndex)
  );
}

export {
  moveChildrenLabels,
  moveLabels,
  moveRows,
  move
};
