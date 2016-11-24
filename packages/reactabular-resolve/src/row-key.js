import { isArray } from 'lodash';

function resolveRowKey({ rowData, rowIndex, rowKey }) {
  if (typeof rowKey === 'function') {
    return `${rowKey({ rowData, rowIndex })}-row`;
  } else if (process.env.NODE_ENV !== 'production') {
    // Arrays cannot have rowKeys by definition so we have to go by index there.
    if (!isArray(rowData) && !{}.hasOwnProperty.call(rowData, rowKey)) {
      console.warn( // eslint-disable-line no-console
        'Table.Body - Missing valid rowKey!',
        rowData,
        rowKey
      );
    }
  }

  if (rowData[rowKey] === 0) {
    return `${rowData[rowKey]}-row`;
  }

  return `${rowData[rowKey] || rowIndex}-row`;
}

export default resolveRowKey;
