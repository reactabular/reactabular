import { findColumn, getColumnByIndex } from 'reactabular-utils';

const byIndex = {
  fieldName: 'columnIndex',
  getColumn(columns, sortingColumnKey) {
    return getColumnByIndex(columns, sortingColumnKey);
  }
};

const byProperty = {
  fieldName: 'property',
  getColumn(columns, property) {
    return findColumn(columns, { property });
  }
};

export default {
  byIndex,
  byProperty
};
