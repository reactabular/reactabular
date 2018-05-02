import { isEqual } from 'lodash';
import React from 'react';

import columnsAreEqual from './columns-are-equal';
import { tableBodyRowDefaults, tableBodyRowTypes } from './types';
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
      columns, renderers, rowKey, rowIndex, rowData
    } = this.props;

    return <React.Fragment key={rowKey}>{
      renderers.row(
        columns.map((column, columnIndex) =>
          <React.Fragment key={`${columnIndex}-body-cell`}>{
            renderCell(columnIndex, renderers.cell, column, column.bodyCell, rowData)
          }</React.Fragment>
        ),
        { rowIndex, rowData, columns, renderer: renderers.row }
      )
    }</React.Fragment>;
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
