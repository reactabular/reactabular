import React from 'react';
import {
  evaluateTransforms, evaluateFormatters, mergePropPair
} from 'reactabular-utils';
import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';

const HeaderRow = ({ rowData, rowIndex, components, onRow }) => (
  React.createElement(
    components.row,
    onRow(rowData, { rowIndex }),
    rowData.map((column, columnIndex) => {
      const { property, header = {}, props = {} } = column;
      const evaluatedProperty = property || (header && header.property);
      const {
        label,
        transforms = [],
        formatters = []
      } = header;
      const extraParameters = {
        columnIndex,
        property: evaluatedProperty,
        column
      };
      const transformedProps = evaluateTransforms(transforms, label, extraParameters);

      if (!transformedProps) {
        console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
      }

      return React.createElement(
        components.cell,
        {
          key: `${columnIndex}-header`,
          ...mergePropPair( // XXX: convert to a single function call
            mergePropPair(props, header && header.props),
            transformedProps
          )
        },
        transformedProps.children || evaluateFormatters(formatters)(
          label, extraParameters
        )
      );
    })
  )
);
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
