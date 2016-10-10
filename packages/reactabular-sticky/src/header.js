/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Header as TableHeader } from 'reactabular-table';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { style, tableBody, ...props } = this.props;

    return React.createElement(
      TableHeader,
      {
        ref: (header) => {
          this.ref = header && header.getRef();
        },
        style: {
          ...style || {},
          display: 'block',
          overflow: 'auto'
        },
        ...props,
        // Override onScroll as otherwise the logic won't work
        onScroll: ({ target: { scrollLeft } }) => {
          if (tableBody) {
            tableBody.scrollLeft = scrollLeft;
          }
        }
      }
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

export default Header;
