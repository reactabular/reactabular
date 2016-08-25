import React from 'react';
import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = [];
    this.allRows = [];
    this.rowsToRender = [];

    this.ref = null;
  }
  componentWillMount() {
    // Stash only first few rows for the first rendering. We'll use
    // this data for initial measurements
    this.allRows = this.props.rows;
    this.rowsToRender = this.allRows.slice(0, 3);
  }
  componentDidMount() {
    // Render visible rows after initial measurement
    const bodyHeight = this.props.height;
    const amountOfMeasuredRows = this.measuredRows.length;
    const averageHeight = this.measuredRows.reduce((a, b) => (
      a + (b / amountOfMeasuredRows)
    ), 0);
    const amountOfRowsToRender = Math.ceil(bodyHeight / averageHeight) + 2;

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'measured rows', this.measuredRows,
        'average height', averageHeight,
        'body height', bodyHeight,
        'amount of rows to render', amountOfRowsToRender
      );
    }

    this.rowsToRender = this.allRows.slice(0, amountOfRowsToRender);

    // No need to tweak the scrollbar height if there's no scrollbar in the
    // first place.
    if (amountOfRowsToRender * averageHeight < this.ref.offsetHeight) {
      return;
    }

    const remainingHeight = (this.allRows.length - amountOfRowsToRender) * averageHeight;

    // Calculate the padding of the last row so we can match whole height. This
    // won't be totally accurate if row heights differ but should get close
    // enough in most cases.
    this.rowsToRender[this.rowsToRender.length - 1].lastHeight = remainingHeight;
  }
  getChildContext() {
    const props = this.props;
    const style = props.style || {};
    const e = this.ref || {
      offsetHeight: style.maxHeight,
      scrollTop: 0
    };

    return {
      offsetHeight: e.offsetHeight,
      scrollTop: e.scrollTop,
      updateHeight: height => {
        // XXXXX: this probably needs the concept of id (row[rowKey])
        this.measuredRows.push(height);
      },
      rows: this.rows
    };
  }
  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'rendering',
        this.rowsToRender.length, '/', this.props.rows.length
      );
    }

    const { onRow, ...props } = this.props;

    // TODO: compose onRow handler here??? - capture style prop from row and attach
    // it to the row

    // TODO: mark and render a special row to take the remaining space based on
    // measurements
    return (
      <Body
        {...props}
        onRow={(row, rowIndex) => {
          // Tweak the height of the last row so that scrollbar looks fine.
          const { style, ...rowProps } = onRow ? onRow(row, rowIndex) : {};
          let customStyle = style;

          if (row.lastHeight) {
            customStyle = {
              ...style,
              height: row.lastHeight
            };
          }

          return {
            rowProps,
            style: customStyle
          };
        }}
        rows={this.rowsToRender}
        ref={body => {
          this.ref = body && body.getRef();
        }}
        onScroll={({ target: { scrollTop } }) => {
          console.log('on scroll', scrollTop); // eslint-disable-line no-console

          // TODO: update rows now
        }}
      />
    );
  }
  getRef() {
    return this.ref;
  }
}
VirtualizedBody.defaultProps = Body.defaultProps;
VirtualizedBody.propTypes = {
  ...Body.propTypes,
  height: React.PropTypes.number.isRequired
};
VirtualizedBody.childContextTypes = bodyChildContextTypes;

export default VirtualizedBody;
