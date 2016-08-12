import isEqual from 'lodash/isEqual';
import React from 'react';
import {
  evaluateTransforms, mergePropPair
} from 'reactabular-utils';
import { tableBodyTypes, tableBodyContextTypes } from './types';

export default class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Skip checking props against `onRow` since that can be bound at render().
    // That's not particularly good practice but you never know how the users
    // prefer to define the handler.
    return !(isEqual(omitOnRow(this.props), omitOnRow(nextProps)) &&
      isEqual(this.context, nextContext));
  }
  render() {
    const { onRow, rows, rowKey, ...props } = this.props;
    const { bodyColumns, components } = this.context;

    props.ref = body => {
      this.ref = body;
    };

    return React.createElement(
      components.body.wrapper,
      props,
      rows.map((r, i) => {
        if (process.env.NODE_ENV !== 'production') {
          // Arrays cannot have rowKeys by definition so we have to go by index there.
          if (!Array.isArray(r) && !{}.hasOwnProperty.call(r, rowKey)) {
            console.warn( // eslint-disable-line no-console
              'Table.Body - Missing valid rowKey!',
              r,
              rowKey
            );
          }
        }

        return React.createElement(BodyRow, {
          key: `${r[rowKey] || i}-row`,
          components: components.body,
          row: r,
          rowProps: onRow(r, i),
          rowIndex: i,
          rowData: rows[i],
          columns: bodyColumns
        });
      })
    );
  }
  getRef() {
    return this.ref;
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = {
  onRow: () => {}
};
Body.contextTypes = tableBodyContextTypes;

function omitOnRow(props) {
  const { onRow, ...ret } = props; // eslint-disable-line no-unused-vars

  return ret;
}

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
        const transformed = evaluateTransforms(transforms, row[property], extraParameters);

        if (!transformed) {
          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
        }

        return React.createElement(
          components.cell,
          {
            key: `${j}-cell`,
            ...mergePropPair(props, transformed)
          },
          transformed.children || format(row[`_${property}`] || row[property], extraParameters)
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
