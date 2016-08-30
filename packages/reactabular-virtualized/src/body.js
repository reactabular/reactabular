import isEqual from 'lodash/isEqual';
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
      startIndex: 0, // Index where to start rendering

      // Heights for extra rows to mimic scrolling
      startHeight: 0,
      endHeight: 0,

      // Show extra row (even/odd issue)
      showExtraRow: false
    };

    this.updateRowsToRender = this.updateRowsToRender.bind(this);
  }
  componentDidMount() {
    this.updateRowsToRender();
  }
  componentWillReceiveProps(nextProps) {
    // If rows change, invalidate measurement data
    if (!isEqual(this.props.rows, nextProps.rows)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('invalidating measurements'); // eslint-disable-line no-console
      }

      this.measuredRows = [];

      this.setState({
        startIndex: 0,
        amountOfRowsToRender: 3
      }, () => this.updateRowsToRender());
    }
  }
  getChildContext() {
    const { startHeight, endHeight, showExtraRow } = this.state;

    return {
      startHeight,
      endHeight,
      showExtraRow,
      updateHeight: (index, height) => {
        this.measuredRows[index] = height;
      }
    };
  }
  render() {
    const { onRow, rows, onScroll, ...props } = this.props;
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

    return React.createElement(
      Body,
      {
        ...props,
        onRow: (row, rowIndex) => {
          const rowProps = onRow ? onRow(row, rowIndex) : {};

          return {
            // Pass index so that row heights can be tracked properly
            'data-rowindex': startIndex + rowIndex,
            ...rowProps
          };
        },
        rows: rowsToRender,
        ref: body => {
          this.ref = body && body.getRef();
        },
        onScroll: e => {
          onScroll && onScroll(e);

          const { target: { scrollTop } } = e;

          this.updateRowsToRender(scrollTop);
        }
      }
    );
  }
  updateRowsToRender(scrollTop = 0) {
    // Render visible rows after initial measurement
    const { height } = this.props;
    const measuredSample = this.measuredRows;

    // Calculate amount of rows to render based on average height and take the
    // amount of actual rows into account.
    const amountOfMeasuredRows = measuredSample.filter(a => a).length;
    const averageHeight = measuredSample
      .reduce((a, b) => (
        a + (b / amountOfMeasuredRows)
      ), 0);
    const amountOfRowsToRender = Math.ceil(height / averageHeight) + 2;

    const startIndex = Math.floor(scrollTop / averageHeight);
    const rowsToRender = this.props.rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    );

    // Escape if there are no rows to render for some reason
    if (!rowsToRender.length) {
      return;
    }

    const startHeight = startIndex * averageHeight;

    // Calculate the padding of the last row so we can match whole height. This
    // won't be totally accurate if row heights differ but should get close
    // enough in most cases.
    const endHeight = Math.max(
      (
        (
          this.props.rows.length - amountOfRowsToRender
        ) * averageHeight
      ) - startHeight,
      0
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'amount of measured rows', amountOfMeasuredRows,
        'measured sample', measuredSample,
        'measured rows', this.measuredRows,
        'average height', averageHeight,
        'body height', height,
        'amount of rows to render', amountOfRowsToRender,
        'start index', startIndex,
        'scroll top', scrollTop,
        'start height', startHeight,
        'end height', endHeight
      );
    }

    // Update state and render now that data has changed
    this.setState({
      amountOfRowsToRender,
      startIndex,
      showExtraRow: !(startIndex % 2),
      startHeight,
      endHeight
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
