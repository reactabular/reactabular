import React from 'react';
import { tableTypes } from './types';
import {
  resolveHeaderRows, evaluateTransforms
} from './utils';

// This has to be a React component instead of a function.
// Otherwise refs won't work.
export default class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    const { children, ...props } = this.props;
    const { columns, components } = this.context;

    return React.createElement(
      components.header,
      props,
      [resolveHeaderRows(columns).map((row, i) =>
        <HeaderRow
          key={`${i}-header-row`}
          row={row}
        />
      )].concat(children)
    );
  }
}
Header.propTypes = {
  children: React.PropTypes.any
};
Header.contextTypes = {
  columns: tableTypes.columns,
  components: React.PropTypes.object
};

const HeaderRow = ({ row }) => (
  <tr>{
    row.map((column, j) => {
      const columnProps = column.props || {};
      const {
        label,
        transforms = [() => ({})],
        format = a => a,
        component = 'th',
        props // eslint-disable-line no-shadow
      } = column.header || {};
      const extraParameters = {
        columnIndex: j,
        column,
        rowData: label
      };
      const key = `${j}-header`;
      const transformed = evaluateTransforms(transforms, label, extraParameters);

      if (!transformed) {
        console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
      }

      return React.createElement(
        component,
        {
          key,
          ...columnProps,
          ...props,
          ...transformed
        },
        transformed.children || format(label, extraParameters)
      );
    })
  }
  </tr>
);
HeaderRow.propTypes = {
  row: React.PropTypes.arrayOf(React.PropTypes.object)
};
