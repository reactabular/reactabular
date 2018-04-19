import React from 'react';
import evaluateFormatters from './evaluate-formatters';
import evaluateTransforms from './evaluate-transforms';
import mergeProps from './merge-props';
import { tableHeaderRowTypes, tableHeaderRowDefaults } from './types';

const HeaderRow = ({
  rowData, rowIndex, renderers, onRow
}) => (
  React.createElement(
    renderers.row,
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
        renderers.cell,
        {
          key: `${columnIndex}-header`,
          ...mergeProps(
            props,
            header && header.props,
            transformedProps
          )
        },
        transformedProps.children || evaluateFormatters(formatters)(label, extraParameters)
      );
    })
  )
);
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;
