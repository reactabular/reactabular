/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Body as TableBody } from 'reactabular-table';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { style, tableHeader, ...props } = this.props;
    const tableHeaderWidth = tableHeader ? tableHeader.clientWidth : 0;
    const tableBodyWidth = this.ref ? this.ref.clientWidth : 0;
    const scrollOffset = tableHeaderWidth - tableBodyWidth;

    return React.createElement(
      TableBody,
      {
        ref: body => {
          this.ref = body && body.getRef();
        },
        style: {
          ...style || {},
          display: 'block',
          overflow: 'auto',
          paddingRight: scrollOffset
        },
        ...props,
        // Override onScroll as otherwise the logic won't work
        onScroll: ({ target: { scrollLeft } }) => {
          if (tableHeader) {
            tableHeader.scrollLeft = scrollLeft;
          }
        }
      }
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

export default Body;
