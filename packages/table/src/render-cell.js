import React from 'react';
import { isFunction } from 'lodash';

function renderCell(columnIndex, renderer, column, cell, rowData) {
  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;
  const data = isFunction(cell) ? rowData : cell;

  return cellRenderer(data, { column, columnIndex, renderer });
}

export default renderCell;
