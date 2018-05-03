import isEqual from 'deep-is';
import React from 'react';

import columnsAreEqual from './columns-are-equal';
import { tableDefaults, tableBodyRowDefaults, tableBodyRowTypes } from './types';
import renderCell from './render-cell';
import isFunction from './is-function';

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
      columns, renderers, rowKey, rowIndex, rowData, props
    } = this.props;

    return React.createElement(
        renderers.row,
        {
          rowIndex,
          rowData,
          rowKey,
          columns,
          renderer: tableDefaults.renderers.body.row,
          props, // TODO: test props
          key: rowKey
        },
        columns.map((column, columnIndex) =>
          React.cloneElement(renderCell({
            columnIndex, renderer: renderers.cell, column, cell: column.bodyCell,
            children: rowData[column.property], props: column.props, rowData, rowIndex
          }), {
            key: `${columnIndex}-body-cell`
          })
        )
      )
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
