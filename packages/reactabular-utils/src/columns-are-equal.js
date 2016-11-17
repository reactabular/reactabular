import isFunction from 'lodash/isFunction';
import diff from 'deep-diff';

function columnsAreEqual(oldColumns, newColumns) {
  return (diff(
    oldColumns, newColumns
  ) || []).filter(
    e => !isFunction(e.lhs)
  ).length === 0;
}

export default columnsAreEqual;
