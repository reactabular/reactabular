import { isEqual, isFunction } from 'lodash';
import React from 'react';
import columnsAreEqual from './columns-are-equal';
import { tableBodyRowDefaults, tableBodyRowTypes } from './types';

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) { // eslint-disable-line no-unused-vars
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
      columns.map((column, columnIndex) => {
        const { property, bodyCell } = column;
        const cellParameters = {
          columnIndex,
          property,
          column,
          renderer: renderers.cell,
          rowData,
          rowIndex,
          rowKey
        };

        // XXXXX: keying
        return isFunction(bodyCell) ? bodyCell(property ? rowData[property] : rowData, cellParameters) : renderers.cell(bodyCell, cellParameters);
      })
    );
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
