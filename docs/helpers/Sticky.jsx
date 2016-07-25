/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Table } from 'reactabular'; // eslint-disable-line import/no-unresolved

// Ref -> class
class Header extends React.Component {
  render() {
    const { style, tableBody, ...props } = this.props;

    return (
      <Table.Header
        style={{
          ...style || {},
          display: 'block',
          overflow: 'auto'
        }}
        {...props}
        onScroll={({ target: { scrollLeft } }) => {
          if (tableBody) {
            tableBody.scrollLeft = scrollLeft;
          }
        }}
      />
    );
  }
}
Header.propTypes = {
  style: React.PropTypes.any,
  tableBody: React.PropTypes.any
};

// Ref -> class
class Body extends React.Component {
  render() {
    const { style, tableHeader, ...props } = this.props;

    return (
      <Table.Body
        style={{
          ...style || {},
          display: 'block',
          overflow: 'auto'
        }}
        {...props}
        onScroll={({ target: { scrollLeft } }) => {
          if (tableHeader) {
            tableHeader.scrollLeft = scrollLeft;
          }
        }}
      />
    );
  }
}
Body.propTypes = {
  style: React.PropTypes.any,
  tableHeader: React.PropTypes.func
};

export default {
  Header,
  Body
};
