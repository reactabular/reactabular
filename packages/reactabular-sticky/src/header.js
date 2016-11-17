/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Header as TableHeader } from 'reactabular-table';

class Header extends React.Component {
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
      TableHeader,
      {
        ref: (header) => {
          this.ref = header && header.getRef();
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
Header.propTypes = {
  style: React.PropTypes.any,
  scroll: React.PropTypes.shape({
    left: React.PropTypes.number
  })
};
Header.defaultProps = {
  scroll: {}
};

export default Header;
