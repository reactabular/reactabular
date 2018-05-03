import React from 'react';

import isFunction from './is-function';

function renderCell(columnIndex, renderer, column, cell, data, rowIndex) {
  if (React.isValidElement(cell)) {
    return cell;
  }

  const cellRenderer = isFunction(cell) ? cell : renderer;

  return cellRenderer({ children: data, column, columnIndex, renderer, props: column.props, rowIndex });
}

export default renderCell;
