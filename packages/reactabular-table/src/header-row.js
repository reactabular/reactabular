import React from 'react';
import { isFunction } from 'lodash';
import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';

const HeaderRow = ({
  rowData, rowIndex, renderers, onRow
}) => (
    React.createElement(
      renderers.row,
      onRow(rowData, { rowIndex }),
      rowData.map((column, columnIndex) => {
        const { property, headerCell } = column;
        const cellParameters = {
          renderer: renderers.cell,
          columnIndex,
          property,
          column
        };
        const cellRenderer = isFunction(headerCell) ? headerCell : renderers.cell;
        const data = isFunction(headerCell) ? rowData : headerCell;

        return cellRenderer(data, cellParameters);
      })
    )
  );
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
