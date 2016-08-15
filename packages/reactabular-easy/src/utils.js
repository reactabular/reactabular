import * as stylesheet from 'stylesheet-helpers';

function createStylesheet() {
  return stylesheet.create();
}

function initializeStyles({ styleSheet, columns, id }) {
  columns.forEach((column, i) => (
    stylesheet.updateProperties(
      styleSheet,
      getColumnClassName(id, i),
      {
        width: `${column.width}px`,
        minWidth: `${column.width}px`
      }
    )
  ));
}

function updateWidth({ styleSheet, width, id, columnIndex }) {
  stylesheet.updateProperties(
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

export {
  createStylesheet,
  initializeStyles,
  getColumnClassName,
  updateWidth
};
