import React from 'react';
import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = [];
    this.ref = null;

    this.state = {
      amountOfRowsToRender: 3, // First few rows for initial measurement
      startIndex: 0,
      lastRow: {
        height: -1,
        index: -1
      }
    };

    this.updateRowsToRender = this.updateRowsToRender.bind(this);
  }
  componentDidMount() {
    this.updateRowsToRender();
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
      updateHeight: (index, height) => {
        if (index !== this.state.lastRow.index) {
          this.measuredRows[index] = height;
        }
      },
      rows: this.rows
    };
  }
  render() {
    const { onRow, rows, ...props } = this.props;
    const { startIndex, amountOfRowsToRender, lastRow } = this.state;
    const rowsToRender = rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'rendering', rowsToRender.length, '/', rows.length,
        'rows to render', rowsToRender,
        'start index', startIndex,
        'amount of rows to render', amountOfRowsToRender
      );
    }

    return (
      <Body
        {...props}
        onRow={(row, rowIndex) => {
          // Tweak the height of the last row so that scrollbar looks fine.
          const { style, ...rowProps } = onRow ? onRow(row, rowIndex) : {};
          let customStyle = style;

          if (startIndex + rowIndex === lastRow.index) {
            customStyle = {
              ...style,
              height: lastRow.height
            };
          }

          return {
            'data-rowindex': startIndex + rowIndex,
            ...rowProps,
            style: customStyle
          };
        }}
        rows={rowsToRender}
        ref={body => {
          this.ref = body && body.getRef();
        }}
        onScroll={({ target: { scrollTop } }) => {
          this.updateRowsToRender(scrollTop);
        }}
      />
    );
  }
  updateRowsToRender(scrollTop = 0) {
    // Render visible rows after initial measurement
    const bodyHeight = this.props.height;
    const measuredSample = this.measuredRows;

    // Calculate amount of rows to render based on average height
    const amountOfMeasuredRows = measuredSample.length;
    const averageHeight = measuredSample
      .reduce((a, b) => (
        a + (b / amountOfMeasuredRows)
      ), 0);
    const amountOfRowsToRender = Math.ceil(bodyHeight / averageHeight) + 2;

    const startIndex = Math.floor(scrollTop / averageHeight);

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'measured sample', measuredSample,
        'measured rows', this.measuredRows,
        'average height', averageHeight,
        'body height', bodyHeight,
        'amount of rows to render', amountOfRowsToRender,
        'start index', startIndex,
        'scroll top', scrollTop,
        'last row', this.state.lastRow
      );
    }

    const rowsToRender = this.props.rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    );

    // Escape if there are no rows to render for some reason
    if (!rowsToRender.length) {
      return;
    }

    // No need to tweak the scrollbar height if there's no scrollbar in the
    // first place.
    if (amountOfRowsToRender * averageHeight < this.ref.offsetHeight) {
      return;
    }

    // TODO: calculate startHeight to push rows to the correct place

    const remainingHeight = (this.props.rows.length - amountOfRowsToRender) * averageHeight;

    // Update state and render now that data has changed
    this.setState({
      amountOfRowsToRender,
      startIndex,
      // Calculate the padding of the last row so we can match whole height. This
      // won't be totally accurate if row heights differ but should get close
      // enough in most cases.
      lastRow: {
        height: remainingHeight,
        index: (startIndex + rowsToRender.length) - 1
      }
    });
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
