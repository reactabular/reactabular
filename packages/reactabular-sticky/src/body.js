/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Body as TableBody } from 'reactabular-table';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  componentWillReceiveProps(nextProps) {
    const nextLeft = nextProps.scroll.left;

    if (
      this.props.scroll.left !== nextLeft &&
      this.ref.scrollLeft !== nextLeft
    ) {
      this.ref.scrollLeft = nextLeft;
    }
  }
  render() {
    const { style, scroll, ...props } = this.props;

    return React.createElement(
      TableBody,
      {
        ref: (body) => {
          this.ref = body && body.getRef();
        },
        style: {
          ...style || {},
          display: 'block',
          overflow: 'scroll'
        },
        ...props
      }
    );
  }
  getRef() {
    return this.ref;
  }
}
Body.propTypes = {
  style: React.PropTypes.any,
  scroll: React.PropTypes.shape({
    left: React.PropTypes.number
  })
};

export default Body;
