import React from 'react';

import isFunction from './is-function';

function renderCell(columnIndex, renderer, column, cell, data) {
  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;

  return cellRenderer(data, { column, columnIndex, renderer });
}

export default renderCell;
