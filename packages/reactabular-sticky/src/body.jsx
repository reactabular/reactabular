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

    return (
      <TableBody
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

export default Body;
