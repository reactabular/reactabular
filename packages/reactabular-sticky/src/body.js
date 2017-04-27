/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Body as TableBody } from 'reactabular-table';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { style, tableHeader, onScroll, scrollLeftLimitOffset, ...props } = this.props;
    const tableHeaderWidth = tableHeader ? tableHeader.clientWidth : 0;
    const tableBodyWidth = this.ref ? this.ref.clientWidth : 0;
    const scrollOffset = tableHeaderWidth - tableBodyWidth || 0;

    return React.createElement(
      TableBody,
      {
        ref: (body) => {
          this.ref = body && body.getRef();
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

          const { target: { scrollLeft, scrollWidth, clientWidth } } = e;

          // force move the scrollLeft back `scrollLeftLimitOffset` pixedl
          // if `props.scrollLeftLimitOffset` is defined
          // @see https://github.com/reactabular/reactabular/issues/259
          // "cell in sticky not aligned with header when scrolling to the right end"
          // so the solution is as simple as NOT to scroll to the right end
          // scticky header doesn't have the problem.
          if (scrollLeftLimitOffset &&
              scrollLeftLimitOffset > 0 &&
              scrollLeft > scrollWidth - clientWidth - scrollLeftLimitOffset) {
            /* eslint-disable no-param-reassign */
            e.target.scrollLeft = scrollWidth - clientWidth - scrollLeftLimitOffset;
            /* eslint-enable */
          }

          if (tableHeader) {
            tableHeader.scrollLeft = scrollLeft;
          }
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
  tableHeader: React.PropTypes.any,
  onScroll: React.PropTypes.func,
  scrollLeftLimitOffset: React.PropTypes.number
};

export default Body;
