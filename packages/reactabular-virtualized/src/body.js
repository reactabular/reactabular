import isEqual from 'lodash/isEqual';
import React from 'react';
import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';
import calculateAverageHeight from './calculate-average-height';
import calculateRows from './calculate-rows';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = {}; // row key -> measurement
    this.ref = null;
    this.scrollTop = 0;
    this.initialMeasurement = true;

    this.state = getInitialState();

    this.checkMeasurements = this.checkMeasurements.bind(this);
  }
  componentDidMount() {
    this.checkMeasurements();
  }
  componentDidUpdate() {
    this.checkMeasurements();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.rows, nextProps.rows)) {
      if (process.env.NODE_ENV !== 'production' && window.LOG_VIRTUALIZED) {
        console.log('invalidating measurements'); // eslint-disable-line no-console
      }

      const rows = calculateRows({
        scrollTop: this.scrollTop,
        measuredRows: this.measuredRows,
        height: nextProps.height,
        rowKey: nextProps.rowKey,
        rows: nextProps.rows
      });

      if (!rows) {
        return;
      }

      this.setState(rows);
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
      },
      // Capture height data only during the initial measurement
      initialMeasurement: this.initialMeasurement
    };
  }
  render() {
    const { onRow, rows, onScroll, ...props } = this.props;
    const { startIndex, amountOfRowsToRender } = this.state;
    const rowsToRender = rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    );

    if (process.env.NODE_ENV !== 'production' && window.LOG_VIRTUALIZED) {
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
        ref: (body) => {
          this.ref = body && body.getRef().getRef();
        },
        onScroll: (e) => {
          onScroll && onScroll(e);

          const { target: { scrollTop } } = e;

          this.scrollTop = scrollTop;

          this.setState(
            calculateRows({
              scrollTop,
              measuredRows: this.measuredRows,
              height: this.props.height,
              rowKey: this.props.rowKey,
              rows: this.props.rows
            })
          );
        }
      }
    );
  }
  getRef() {
    const ref = this.ref;

    ref.scrollTo = (index) => {
      const startIndex = parseInt(index, 10);

      if (startIndex >= 0) {
        const startHeight = calculateAverageHeight({
          measuredRows: this.measuredRows,
          rows: this.props.rows,
          rowKey: this.props.rowKey
        }) * startIndex;

        this.scrollTop = startHeight;
        this.ref.scrollTop = startHeight;
      }
    };

    return ref;
  }
  checkMeasurements() {
    // If there are no valid measurements, calculate some after waiting a while.
    // Without this styling solutions like Radium won't work as you might expect
    // given they can take a while to set container height.
    if (this.initialMeasurement) {
      setTimeout(() => {
        const rows = calculateRows({
          scrollTop: this.scrollTop,
          measuredRows: this.measuredRows,
          height: this.props.height,
          rowKey: this.props.rowKey,
          rows: this.props.rows
        });

        if (!rows) {
          // Refresh the rows to trigger measurement.
          this.forceUpdate();

          return;
        }

        this.setState(
          rows,
          () => {
            this.initialMeasurement = false;
          }
        );
      }, 100);
    }
  }
}
VirtualizedBody.defaultProps = Body.defaultProps;
VirtualizedBody.propTypes = {
  ...Body.propTypes,
  height: React.PropTypes.number.isRequired
};
VirtualizedBody.childContextTypes = bodyChildContextTypes;

function getInitialState() {
  return {
    amountOfRowsToRender: 3, // First few rows for initial measurement
    startIndex: 0, // Index where to start rendering

    // Heights for extra rows to mimic scrolling
    startHeight: 0,
    endHeight: 0,

    // Show extra row (even/odd issue)
    showExtraRow: false
  };
}

export default VirtualizedBody;
