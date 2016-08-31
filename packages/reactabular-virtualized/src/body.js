import isEqual from 'lodash/isEqual';
import React from 'react';
import { Body } from 'reactabular-sticky';
import { resolveRowKey } from 'reactabular-utils';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = {}; // row key -> measurement
    this.ref = null;
    this.scrollTop = 0;

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
    this.updateRowsToRender({
      scrollTop: this.scrollTop,
      measuredRows: this.measuredRows,
      height: this.props.height,
      rowKey: this.props.rowKey,
      rows: this.props.rows
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.rows, nextProps.rows)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('invalidating measurements'); // eslint-disable-line no-console
      }

      this.updateRowsToRender({
        scrollTop: this.scrollTop,
        measuredRows: this.measuredRows,
        height: nextProps.height,
        rowKey: nextProps.rowKey,
        rows: nextProps.rows
      });
    }
  }
  getChildContext() {
    const { startHeight, endHeight, showExtraRow } = this.state;

    return {
      startHeight,
      endHeight,
      showExtraRow,
      updateHeight: (rowKey, height) => {
        this.measuredRows[rowKey] = height;
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
        onRow: (row, extra) => {
          const rowProps = onRow ? onRow(row, extra) : {};

          return {
            // Pass index so that row heights can be tracked properly
            'data-rowkey': extra.rowKey,
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

          this.scrollTop = scrollTop;

          this.updateRowsToRender({
            scrollTop,
            measuredRows: this.measuredRows,
            height: this.props.height,
            rowKey: this.props.rowKey,
            rows: this.props.rows
          });
        }
      }
    );
  }
  updateRowsToRender({ measuredRows, height, rowKey, rows, scrollTop = 0 }) {
    const resolvedRowKeys = rows.map((rowData, rowIndex) => (
      resolveRowKey({ rowData, rowIndex, rowKey }))
    );
    const measuredAmounts = Object.keys(measuredRows).filter(
      key => resolvedRowKeys.indexOf(key) >= 0
    ).map(key => measuredRows[key]);

    // Calculate amount of rows to render based on average height and take the
    // amount of actual rows into account.
    const amountOfMeasuredRows = measuredAmounts.length;
    const averageHeight = measuredAmounts
      .reduce((a, b) => (
        a + (b / amountOfMeasuredRows)
      ), 0);
    const amountOfRowsToRender = Math.ceil(height / averageHeight) + 2;

    const startIndex = Math.floor(scrollTop / averageHeight);
    const rowsToRender = rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'update rows to render',
        'measured rows', measuredRows,
        'measured amounts', measuredAmounts,
        'amount of measured rows', amountOfMeasuredRows,
        'amount of rows to render', amountOfRowsToRender,
        'rows to render', rowsToRender,
        'start index', startIndex
      );
    }

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
        'average height', averageHeight,
        'body height', height,
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
