/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Body as TableBody, types } from '@reactabular/table';

class Body extends React.Component {
  render() {
    const {
      style, onScroll, ...props
    } = this.props;
    const stickyHeader = this.context.getRef('stickyHeader');
    const stickyBody = this.context.getRef('stickyHeader');
    const tableHeaderWidth = stickyHeader ? stickyHeader.clientWidth : 0;
    const tableBodyWidth = stickyBody ? stickyBody.clientWidth : 0;
    const scrollOffset = tableHeaderWidth - tableBodyWidth || 0;

    return React.createElement(
      TableBody,
      {
        ...props,
        ref: (body) => {
          body && this.context.setRef('stickyBody', body.getRef());
        },
        style: {
          display: 'block',
          overflow: 'auto',
          paddingRight: scrollOffset,
          ...style || {}
        },
        // Expand onScroll as otherwise the logic won't work
        onScroll: (e) => {
          onScroll && onScroll(e);

          const { target: { scrollLeft } } = e;

          const scrollStickyHeader = this.context.getRef('stickyHeader');

          if (scrollStickyHeader) {
            scrollStickyHeader.scrollLeft = scrollLeft;
          }
        }
      }
    );
  }
}
Body.contextTypes = types.tableRefTypes;
Body.propTypes = {
  style: PropTypes.any,
  onScroll: PropTypes.func
};

export default Body;
