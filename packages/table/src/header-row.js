import React from 'react';

import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';
import renderCell from './render-cell';

const HeaderRow = ({
  rowData, rowIndex, renderers
}) => (
  renderers.row({
    rowIndex,
    rowData,
    renderer: renderers.row,
    children: rowData.map((column, columnIndex) =>
      <React.Fragment key={`${columnIndex}-header-cell`}>{
        renderCell(columnIndex, renderers.cell, column, column.headerCell, rowData)
      }</React.Fragment>
    )
  })
);
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
