/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Table } from 'reactabular';

// Ref -> class
class Header extends React.Component {
  render() {
    const { style, onScroll, ...props } = this.props;

    return (
      <Table.Header
        style={{
          ...style || {},
          display: 'block',
          overflow: 'auto'
        }}
        {...props}
        onScroll={({ target: { scrollLeft } }) => onScroll(scrollLeft)}
      />
    );
  }
}
Header.propTypes = {
  style: React.PropTypes.any,
  onScroll: React.PropTypes.func
};

// Ref -> class
class Body extends React.Component {
  render() {
    const { style, onScroll, ...props } = this.props;

    return (
      <Table.Body
        style={{
          ...style || {},
          display: 'block',
          overflow: 'auto'
        }}
        {...props}
        onScroll={({ target: { scrollLeft } }) => onScroll(scrollLeft)}
      />
    );
  }
}
Body.propTypes = {
  style: React.PropTypes.any,
  onScroll: React.PropTypes.func
};

export default {
  Header,
  Body
};
