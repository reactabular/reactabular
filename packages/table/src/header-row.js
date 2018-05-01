import React from 'react';

import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';
import renderCell from './render-cell';

const HeaderRow = ({
  rowData, rowIndex, renderers
}) => (
  renderers.row(
    rowData.map((column, columnIndex) =>
      <React.Fragment key={`${columnIndex}-header-cell`}>{
        renderCell(columnIndex, renderers.cell, column, column.property, column.headerCell, rowData)
      }</React.Fragment>
    ),
    { rowIndex, rowData, renderer: renderers.row }
  )
);
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
