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
      startPadding: 0,
      endPadding: 0
    };

    this.updateRowsToRender = this.updateRowsToRender.bind(this);
  }
  componentDidMount() {
    this.updateRowsToRender();
  }
  getChildContext() {
    const { startPadding, endPadding } = this.state;

    return {
      startPadding,
      endPadding,
      updateHeight: (index, height) => {
        this.measuredRows[index] = height;
      }
    };
  }
  render() {
    const { onRow, rows, ...props } = this.props;
    const { startIndex, amountOfRowsToRender } = this.state;
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
          const rowProps = onRow ? onRow(row, rowIndex) : {};

          return {
            // Pass index so that row heights can be tracked properly
            'data-rowindex': startIndex + rowIndex,
            ...rowProps
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
        'start padding', this.state.startPadding,
        'end padding', this.state.endPadding
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

    const remainingHeight = (this.props.rows.length - amountOfRowsToRender) * averageHeight;

    // Update state and render now that data has changed
    this.setState({
      amountOfRowsToRender,
      startIndex,
      startPadding: 0, // XXXXX: calculate this
      // Calculate the padding of the last row so we can match whole height. This
      // won't be totally accurate if row heights differ but should get close
      // enough in most cases.
      endPadding: remainingHeight
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
