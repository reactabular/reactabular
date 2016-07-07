import React from 'react';
import { tableTypes, tableDefaults } from './types';

const componentDefaults = tableDefaults.components;

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, components, data, rowKey } = this.props;

    return {
      columns,
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
Provider.childContextTypes = tableTypes;
