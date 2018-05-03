import React from 'react';

import isFunction from './is-function';

function renderCell(columnIndex, renderer, column, cell, value, rowData, rowIndex) {
  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;

  return cellRenderer({ children: value, column, columnIndex, renderer, props: column.props, rowData, rowIndex });
}

export default renderCell;
