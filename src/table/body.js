import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import React from 'react';
import { tableBodyTypes, tableBodyContextTypes } from './types';
import {
  evaluateTransforms, resolveBodyColumns, mergePropPair
} from './utils';

// This has to be a React component instead of a function.
// Otherwise refs won't work.
export default class Body extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Skip checking props against `onRow` since that can be bound at render().
    // That's not particularly good practice but you never know how the users
    // prefer to define the handler.
    return !(isEqual(omit(this.props, ['onRow']), omit(nextProps, ['onRow'])) &&
      isEqual(this.context, nextContext));
  }
  render() {
    const { onRow, rows, rowKey, ...props } = this.props;
    const { bodyColumns, components } = this.context;

    return React.createElement(
      components.body.wrapper,
      props,
      rows.map((r, i) =>
        React.createElement(BodyRow, {
          key: `${r[rowKey] || i}-row`,
          components: components.body,
          row: r,
          rowProps: onRow(r, i),
          rowIndex: i,
          rowData: rows[i],
          columns: bodyColumns
        })
      )
    );
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = {
  onRow: () => {}
};
Body.contextTypes = tableBodyContextTypes;

class BodyRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const previousProps = this.props;

    return !(
      isEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.row, nextProps.row) &&
      isEqual(previousProps.rowProps, nextProps.rowProps) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }
  render() {
    const { columns, components, row, rowProps, rowIndex, rowData } = this.props;

    return React.createElement(
      components.row,
      rowProps,
      resolveBodyColumns(columns).map(({ column, cell, props }, j) => {
        const {
          property,
          transforms = [],
          format = a => a
        } = cell;
        const value = row[`_${property}`] || row[property];

        const extraParameters = {
          columnIndex: j,
          column,
          rowData,
          rowIndex,
          property
        };
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
          transformed.children || format(value, extraParameters)
        );
      })
    );
  }
}
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
