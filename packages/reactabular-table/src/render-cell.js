import React from 'react';
import { isFunction } from 'lodash';

function renderCell(columnIndex, renderer, column, property, cell, rowData) {
  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;
  const data = isFunction(cell) ? rowData : cell;

  return cellRenderer(data, {
    column, columnIndex, property, renderer
  });
}

export default renderCell;
