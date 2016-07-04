import React from 'react';
import tableTypes from './types';

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, data, rowKey } = this.props;

    return { columns, data, rowKey };
  }
  render() {
    const {
      columns,
      component = 'table',
      data,
      children,
      ...props // eslint-disable-line no-unused-vars
    } = this.props;

    return React.createElement(component, props, children);
  }
}
Provider.propTypes = {
  ...tableTypes,
  component: React.PropTypes.any,
  children: React.PropTypes.any
};
Provider.childContextTypes = tableTypes;
