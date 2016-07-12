import React from 'react';
import { tableTypes, tableDefaults, tableContextTypes } from './types';
import {
  mergeProps
} from './utils';

const componentDefaults = tableDefaults.components;

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, components, data, rowKey } = this.props;
    const headerColumns = [];
    const bodyColumns = [];

    // Merge column props with header/body specific ones so that can be avoided later
    columns.forEach(column => {
      headerColumns.push(column.header ? {
        ...column.header,
        props: mergeProps([column.props, column.header.props]),
        column
      } : {});

      bodyColumns.push(column.cell ? {
        ...column.cell,
        props: mergeProps([column.props, column.cell.props]),
        column
      } : {});
    });

    return {
      headerColumns,
      bodyColumns,
      components: {
        table: components.table || componentDefaults.table,
        header: { ...componentDefaults.header, ...components.header },
        body: { ...componentDefaults.body, ...components.body }
      },
      data,
      rowKey
    };
  }
  render() {
    const {
      columns, // eslint-disable-line no-unused-vars
      data, // eslint-disable-line no-unused-vars
      rowKey, // eslint-disable-line no-unused-vars
      components,
      children,
      ...props
    } = this.props;

    return React.createElement(
      components.table || tableDefaults.components.table,
      props,
      children
    );
  }
}
Provider.propTypes = {
  ...tableTypes,
  children: React.PropTypes.any
};
Provider.defaultProps = {
  ...tableDefaults
};
Provider.childContextTypes = tableContextTypes;
