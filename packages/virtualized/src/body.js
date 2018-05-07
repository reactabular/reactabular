import isEqual from 'deep-is';
import React from 'react';
import PropTypes from 'prop-types';
import { Body } from '@reactabular/sticky';
import { resolveRowKey, types } from '@reactabular/table';

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
    this.timeoutId = 0;

    this.state = getInitialState();

    this.checkMeasurements = this.checkMeasurements.bind(this);
  }
  componentDidMount() {
    this.checkMeasurements();
  }
  componentDidUpdate() {
    this.checkMeasurements();
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  getHeight(optionalProps) {
    // If `optionalProps` is defined, we use `optionalProps` instead of `this.props`.
    const props = optionalProps || this.props;
    // If `props.height` is not defined, we use `props.style.maxHeight` instead.
    return props.height || props.style.maxHeight;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.rows, nextProps.rows)
        || this.getHeight() !== this.getHeight(nextProps)) {
      if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.LOG_VIRTUALIZED) {
        console.log('invalidating measurements'); // eslint-disable-line no-console
      }

      const rows = calculateRows({
        scrollTop: this.scrollTop,
        measuredRows: this.measuredRows,
        height: this.getHeight(nextProps),
        rowKey: nextProps.rowKey,
        rows: nextProps.rows,
        overScan: nextProps.overScan,
        underScan: nextProps.underScan
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
    const {
      onRow, rows, onScroll, overScan, underScan, ...props
    } = this.props;
    const { startIndex, amountOfRowsToRender } = this.state;

    // Attach information about measuring status. This way we can implement
    // proper shouldComponentUpdate
    const rowsToRender = rows.slice(
      startIndex,
      startIndex + amountOfRowsToRender
    ).map((rowData, rowIndex) => ({
      ...rowData,
      _measured: !!this.measuredRows[
        resolveRowKey({
          rowData,
          rowIndex,
          rowKey: this.props.rowKey
        })
      ]
    }));

    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.LOG_VIRTUALIZED) {
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
        rows: rowsToRender,
        onScroll: (e) => {
          onScroll && onScroll(e);

          const { target: { scrollTop } } = e;

          // Y didn't change, bail to avoid rendering rows
          if (this.scrollTop === scrollTop) {
            return;
          }

          this.scrollTop = scrollTop;

          this.setState(calculateRows({
            scrollTop,
            measuredRows: this.measuredRows,
            height: this.getHeight(),
            rowKey: this.props.rowKey,
            rows: this.props.rows,
            overScan: this.props.overScan,
            underScan: this.props.underScan
          }));
        }
      }
    );
  }
  getRef() {
    const ref = this.context.getRef('stickyBody');

    ref.scrollTo = (index) => {
      const startIndex = parseInt(index, 10);

      if (startIndex >= 0) {
        const startHeight = calculateAverageHeight({
          measuredRows: this.measuredRows,
          rows: this.props.rows,
          rowKey: this.props.rowKey
        }) * startIndex;

        this.scrollTop = startHeight;

        const stickyBody = this.context.getRef('stickyBody');

        if (stickyBody) {
          stickyBody.ref.scrollTop = startHeight;
        }
      }
    };

    return ref;
  }
  checkMeasurements() {
    // If there are no valid measurements, calculate some after waiting a while.
    // Without this styling solutions like Radium won't work as you might expect
    // given they can take a while to set container height.
    if (this.initialMeasurement) {
      this.timeoutId = setTimeout(() => {
        const rows = calculateRows({
          scrollTop: this.scrollTop,
          measuredRows: this.measuredRows,
          height: this.getHeight(),
          rowKey: this.props.rowKey,
          rows: this.props.rows,
          overScan: this.props.overScan,
          underScan: this.props.underScan
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
VirtualizedBody.defaultProps = {
  ...Body.defaultProps,
  overScan: 5,
  underScan: 5
};
VirtualizedBody.propTypes = {
  ...Body.propTypes,
  height: heightPropCheck,
  overScan: PropTypes.number,
  underScan: PropTypes.number
};
VirtualizedBody.contextTypes = types.tableRefTypes;
VirtualizedBody.childContextTypes = bodyChildContextTypes;

export function heightPropCheck(props, propName, componentName) {
  if (
    (typeof props[propName] !== 'number') &&
    (!props.style || typeof props.style.maxHeight !== 'number')
  ) {
    return new Error(`height or style.maxHeight of type 'number' is marked as required in ${componentName}`);
  }

  return undefined;
}

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
