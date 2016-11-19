import React from 'react';
import { mergePropPair } from 'reactabular-utils';
import { headerRows as resolveHeaderRows } from 'reactabular-resolve';
import { tableTypes, tableDefaults, tableContextTypes } from './types';

const componentDefaults = tableDefaults.components;

// TODO: shouldComponentUpdate
export default class Provider extends React.Component {
  getChildContext() {
    const { columns, components } = this.props;

    // XXXXX: problematic if columns have been resolved already! merge this idea
    // with the column resolver somehow?
    // Merge column props with header/body specific ones so that can be avoided later
    const headerRows = resolveHeaderRows(columns);

    const bodyColumns = columns.map(
      column => ({
        props: mergePropPair(column.props, column.cell && column.cell.props),
        cell: column.cell || {},
        children: column.children || [], // TODO: test for this case
        property: column.property,
        column
      })
    );

    return {
      headerRows,
      bodyColumns,
      components: {
        table: components.table || componentDefaults.table,
        header: { ...componentDefaults.header, ...components.header },
        body: { ...componentDefaults.body, ...components.body }
      }
    };
  }
  render() {
    const {
      columns, // eslint-disable-line no-unused-vars
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
