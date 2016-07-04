import get from 'lodash/get';
import has from 'lodash/has';
import React from 'react';
import { tableTypes } from './types';
import {
  evaluateTransforms, resolveBodyColumns
} from './utils';

// This has to be a React component instead of a function.
// Otherwise refs won't work.
export default class Body extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    const { row, ...props } = this.props;
    const { columns, data, rowKey } = this.context;

    return (
      <tbody {...props}>{
        data.map((r, i) =>
          <BodyRow
            key={`${r[rowKey] || i}-row`}
            row={r}
            rowProps={row(r, i)}
            rowIndex={i}
            rowData={data[i]}
            columns={columns}
          />
        )
      }</tbody>
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
Body.contextTypes = tableTypes;

const BodyRow = ({ columns, row, rowProps, rowIndex, rowData }) => (
  <tr {...rowProps}>{
    resolveBodyColumns(columns).map((column, j) => {
      const columnProps = column.props || {};
      const {
        property,
        transforms = [() => ({})],
        format = a => a,
        resolve = a => a,
        component = 'td',
        props // eslint-disable-line no-shadow
      } = column.cell || {};
      if (property && !has(row, property)) {
        console.warn(`Table.Body - Failed to find "${property}" property from`, row); // eslint-disable-line max-len, no-console
      }

      const extraParameters = {
        columnIndex: j,
        column,
        rowData,
        rowIndex,
        property
      };
      const value = get(row, property);
      const resolvedValue = resolve(value, extraParameters);
      const transformed = evaluateTransforms(transforms, value, extraParameters);

      if (!transformed) {
        console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
      }

      return React.createElement(
        component,
        {
          key: `${j}-cell`,
          ...columnProps,
          ...props,
          ...transformed
        },
        transformed.children || format(resolvedValue, extraParameters)
      );
    })
  }</tr>
);
BodyRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
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
