// import isEqual from 'lodash/isEqual';
import React from 'react';
import {
  evaluateTransforms, mergePropPair
} from 'reactabular-utils';
import { tableBodyRowDefaults, tableBodyRowTypes } from './types';

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) { // eslint-disable-line no-unused-vars
    // XXXXX
    /* const previousProps = this.props;

    return !(
      isEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );*/

    // TODO: figure out why rowData is equal for virtualization (reference problem?)
    return true;
  }
  render() {
    const { columns, components, onRow, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      onRow(rowData, rowIndex), // TODO: refactor into object format
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
