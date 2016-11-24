import { find } from 'lodash';

const byIndex = {
  fieldName: 'columnIndex',
  getColumn(columns, sortingColumnKey) {
    return columns[sortingColumnKey];
  }
};

const byProperty = {
  fieldName: 'property',
  getColumn(columns, property) {
    return find(columns, { property });
  }
};

export default {
  byIndex,
  byProperty
};
