import { isEqual, isFunction } from 'lodash';
import React from 'react';
import columnsAreEqual from './columns-are-equal';
import evaluateFormatters from './evaluate-formatters';
import evaluateTransforms from './evaluate-transforms';
import mergeProps from './merge-props';
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
    const { columns, renderers, onRow, rowKey, rowIndex, rowData } = this.props;

    return React.createElement(
      renderers.row,
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
          renderers.cell,
          {
            key: `${columnIndex}-cell`,
            ...mergeProps(
              props,
              cell && cell.props,
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
