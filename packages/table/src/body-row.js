import { isEqual, isFunction } from 'lodash';
import React from 'react';
import columnsAreEqual from './columns-are-equal';
import { tableBodyRowDefaults, tableBodyRowTypes } from './types';
import renderCell from './render-cell';

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const previousProps = this.props;

    // Check for row based override.
    const { renderers } = nextProps;

    if (renderers && renderers.row && renderers.row.shouldComponentUpdate) {
      if (isFunction(renderers.row.shouldComponentUpdate)) {
        return renderers.row.shouldComponentUpdate.call(this, nextProps);
      }

      return true;
    }

    return !(
      columnsAreEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const {
      columns, renderers, onRow, rowKey, rowIndex, rowData
    } = this.props;

    return React.createElement(
      renderers.row,
      onRow(rowData, { rowIndex, rowKey }),
      columns.map((column, columnIndex) =>
        <React.Fragment key={`${columnIndex}-body-cell`}>{
          renderCell(columnIndex, renderers.cell, column, column.property, column.bodyCell, rowData)
        }</React.Fragment>
      )
    );
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
