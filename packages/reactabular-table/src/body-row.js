import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import React from 'react';
import {
  evaluateTransforms, evaluateFormatters,
  mergePropPair,
  columnsAreEqual
} from 'reactabular-utils';
import { tableBodyRowDefaults, tableBodyRowTypes } from './types';

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) { // eslint-disable-line no-unused-vars
    const previousProps = this.props;

    // Check for row based override.
    const { components } = nextProps;

    if (components && components.row && components.row.shouldComponentUpdate) {
      if (isFunction(components.row.shouldComponentUpdate)) {
        return components.row.shouldComponentUpdate.call(this, nextProps);
      }

      return true;
    }

    return !(
      columnsAreEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const { columns, components, onRow, rowKey, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      onRow(rowData, { rowIndex, rowKey }),
      columns.map((column, columnIndex) => {
        const { property, cell, props } = column;
        const evaluatedProperty = property || (cell && cell.property);
        const {
          transforms = [],
          formatters = []
        } = cell || {}; // TODO: test against this case
        const extraParameters = {
          columnIndex,
          property: evaluatedProperty,
          column,
          rowData,
          rowIndex,
          rowKey
        };
        const transformed = evaluateTransforms(
          transforms, rowData[evaluatedProperty], extraParameters
        );

        if (!transformed) {
          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
        }

        return React.createElement(
          components.cell,
          {
            key: `${columnIndex}-cell`,
            ...mergePropPair( // XXX: single call
              mergePropPair(props, cell && cell.props),
              transformed
            )
          },
          transformed.children || evaluateFormatters(formatters)(
              rowData[`_${evaluatedProperty}`] ||
              rowData[evaluatedProperty], extraParameters
            )
        );
      })
    );
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
