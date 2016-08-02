/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Table } from 'reactabular'; // eslint-disable-line import/no-unresolved

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { style, tableBody, ...props } = this.props;

    return (
      <Table.Header
        ref={header => {
          this.ref = header && header.getRef();
        }}
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
  getRef() {
    return this.ref;
  }
}
Header.propTypes = {
  style: React.PropTypes.any,
  tableBody: React.PropTypes.any
};

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { style, tableHeader, ...props } = this.props;

    return (
      <Table.Body
        ref={body => {
          this.ref = body && body.getRef();
        }}
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
  getRef() {
    return this.ref;
  }
}
Body.propTypes = {
  style: React.PropTypes.any,
  tableHeader: React.PropTypes.any
};

export {
  Header,
  Body
};
