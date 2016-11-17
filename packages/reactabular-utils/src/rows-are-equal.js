import isEqual from 'lodash/isEqual';

function rowsAreEqual(oldRows, newRows) {
  return isEqual(oldRows, newRows);
}

export default rowsAreEqual;
