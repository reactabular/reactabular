import React from 'react';

import isFunction from './is-function';

// { columnIndex, renderer, column, props, cell, children, rowData, rowIndex }
function renderCell(args) {
  const { cell, renderer } = args;

  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;

  return cellRenderer(args);
}

export default renderCell;
