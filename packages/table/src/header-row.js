import React from 'react';

import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';
import renderCell from './render-cell';

// eslint-disable-next-line react/prefer-stateless-function
class HeaderRow extends React.Component {
  render() {
    const { rowData, rowIndex, renderers } = this.props;

    return React.createElement(
      renderers.row,
      {
        rowIndex,
        rowData,
        renderer: renderers.row
      },
      rowData.map((column, columnIndex) =>
      <React.Fragment key={`${columnIndex}-header-cell`}>{
        renderCell(columnIndex, renderers.cell, column, column.headerCell, column.headerCell)
      }</React.Fragment>
    )
    );
  }
}
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
