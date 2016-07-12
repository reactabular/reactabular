import get from 'lodash/get';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { tableBodyContextTypes } from './types';
import {
  evaluateTransforms, resolveBodyColumns, mergePropPair
} from './utils';

// This has to be a React component instead of a function.
// Otherwise refs won't work.
export default class Body extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(isEqual(this.props, nextProps) && isEqual(this.context, nextContext));
  }
  render() {
    const { row, ...props } = this.props;
    const { bodyColumns, components, data, rowKey } = this.context;

    return React.createElement(
      components.body.wrapper,
      props,
      data.map((r, i) =>
        React.createElement(BodyRow, {
          key: `${r[rowKey] || i}-row`,
          components: components.body,
          row: r,
          rowProps: row(r, i),
          rowIndex: i,
          rowData: data[i],
          columns: bodyColumns
        })
      )
    );
  }
}
Body.propTypes = {
  row: React.PropTypes.func,
  className: React.PropTypes.string
};
Body.defaultProps = {
  row: () => {}
};
Body.contextTypes = tableBodyContextTypes;

const BodyRow = ({ columns, components, row, rowProps, rowIndex, rowData }) => (
  React.createElement(
    components.row,
    rowProps,
    resolveBodyColumns(columns).map((column, j) => {
      const {
        property,
        transforms = [],
        format = a => a,
        resolve = a => a,
        props // eslint-disable-line no-shadow
      } = column;

      if (property && !has(row, property)) {
        console.warn(`Table.Body - Failed to find "${property}" property from`, row); // eslint-disable-line max-len, no-console
      }

      const extraParameters = {
        columnIndex: j,
        column: column.column,
        rowData,
        rowIndex,
        property
      };
      const value = get(row, property);
      const transformed = evaluateTransforms(transforms, value, extraParameters);

      if (!transformed) {
        console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
      }

      return React.createElement(
        components.cell,
        {
          key: `${j}-cell`,
          ...mergePropPair(props, transformed)
        },
        transformed.children || format(
          resolve(value, extraParameters),
          extraParameters
        )
      );
    })
  )
);
BodyRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object,
  row: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  rowProps: React.PropTypes.object,
  rowIndex: React.PropTypes.number.isRequired,
  rowData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]).isRequired
};
