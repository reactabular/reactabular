import React from 'react';
import {
  evaluateTransforms, mergePropPair
} from 'reactabular-utils';

const HeaderRow = ({ row, components }) => (
  React.createElement(
    components.row,
    {},
    row.map((column, columnIndex) => {
      const { property, header = {}, props = {} } = column;
      const evaluatedProperty = property || (header && header.property);
      const {
        label,
        transforms = [],
        format = a => a
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
        transformedProps.children || format(label, extraParameters)
      );
    })
  )
);
HeaderRow.propTypes = {
  row: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.object
};

export default HeaderRow;
