/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Header as TableHeader, types } from '@reactabular/table';

class Header extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return React.createElement(
      TableHeader,
      {
        ref: (header) => {
          header && this.context.setRef('stickyHeader', header.getRef());
        },
        style: {
          display: 'block',
          overflow: 'auto',
          ...style || {}
        },
        ...props,
        // Override onScroll as otherwise the logic won't work
        onScroll: ({ target: { scrollLeft } }) => {
          const stickyBody = this.context.getRef('stickyBody');

          if (stickyBody) {
            stickyBody.scrollLeft = scrollLeft;
          }
        }
      }
    );
  }
}
Header.contextTypes = types.tableRefTypes;
Header.propTypes = {
  style: PropTypes.any
};

export default Header;
