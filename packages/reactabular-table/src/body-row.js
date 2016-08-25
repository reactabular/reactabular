import isEqual from 'lodash/isEqual';
import React from 'react';
import {
  evaluateTransforms, mergePropPair
} from 'reactabular-utils';

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const previousProps = this.props;

    return !(
      isEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const { columns, components, onRow, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      onRow(rowData, rowIndex),
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
BodyRow.defaultProps = {
  onRow: () => ({})
};
BodyRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object,
  onRow: React.PropTypes.func,
  rowIndex: React.PropTypes.number.isRequired,
  rowData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]).isRequired
};

export default BodyRow;
