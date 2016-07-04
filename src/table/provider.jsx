import React from 'react';
import tableTypes from './types';

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, data, rowKey } = this.props;

    return { columns, data, rowKey };
  }
  render() {
    const {
      columns, data, children, ...props // eslint-disable-line no-unused-vars
    } = this.props;

    return <table {...props}>{children}</table>;
  }
}
Provider.propTypes = {
  ...tableTypes,
  children: React.PropTypes.any
};
Provider.childContextTypes = tableTypes;
