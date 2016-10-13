import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import React from 'react';
import {
  evaluateTransforms, mergePropPair
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
      isEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const { columns, components, onRow, rowKey, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      onRow(rowData, { rowIndex, rowKey }),
      columns.map(({ column, cell, property, props }, j) => {
        const {
          transforms = [],
          format = a => a
        } = cell || {}; // TODO: test against this case
        const extraParameters = {
          columnIndex: j,
          column,
          rowData,
          rowIndex,
          rowKey,
          property
        };
        const transformed = evaluateTransforms(
          transforms, rowData[property], extraParameters
        );

        if (!transformed) {
          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
        }

        return React.createElement(
          components.cell,
          {
            key: `${j}-cell`,
            ...mergePropPair(props, transformed)
          },
          transformed.children ||
          format(rowData[`_${property}`] ||
          rowData[property], extraParameters)
        );
      })
    );
  }
}
BodyRow.defaultProps = tableBodyRowDefaults;
BodyRow.propTypes = tableBodyRowTypes;

export default BodyRow;
