import isFunction from 'lodash/isFunction';
import React from 'react';
import {
  evaluateTransforms, mergePropPair,
  columnsAreEqual, rowsAreEqual
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
      rowsAreEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const { columns, components, onRow, rowKey, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      onRow(rowData, { rowIndex, rowKey }),
      columns.map(({ property, header, cell, props }, j) => {
        const evaluatedProperty = property || (cell && cell.property);
        const {
          transforms = [],
          format = a => a
        } = cell || {}; // TODO: test against this case
        const extraParameters = {
          columnIndex: j,
          property: evaluatedProperty,
          column: {
            header,
            cell
          },
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
            key: `${j}-cell`,
            ...mergePropPair( // XXX: single call
              mergePropPair(props, cell && cell.props),
              transformed
            )
          },
          transformed.children ||
          format(rowData[`_${evaluatedProperty}`] ||
          rowData[evaluatedProperty], extraParameters)
        );
      })
    );
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
