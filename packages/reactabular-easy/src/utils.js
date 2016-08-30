import findIndex from 'lodash/findIndex';
import * as stylesheet from 'stylesheet-helpers';

function createStylesheet(document) {
  return stylesheet.create(document);
}

function initializeStyles({ document, styleSheet, columns, id }) {
  columns.forEach((column, i) => (
    stylesheet.updateProperties(
      document,
      styleSheet,
      getColumnClassName(id, i),
      {
        width: `${column.width}px`,
        minWidth: `${column.width}px`
      }
    )
  ));
}

function updateWidth({ document, styleSheet, width, id, columnIndex }) {
  stylesheet.updateProperties(
    document,
    styleSheet,
    getColumnClassName(id, columnIndex),
    {
      width: `${width}px`,
      minWidth: `${width}px`
    }
  );
}

function getColumnClassName(id, i) {
  return `column-${id}-${i}`;
}

function getSelectedRowIndex({ rows, selectedRow, rowKey }) {
  return findIndex(rows, {
    [rowKey]: selectedRow[rowKey]
  });
}

export {
  createStylesheet,
  initializeStyles,
  getColumnClassName,
  updateWidth,
  getSelectedRowIndex
};
