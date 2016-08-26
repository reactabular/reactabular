import React from 'react';
import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.startIndex = 0;
    this.measuredRows = [];
    this.allRows = [];
    this.lastRow = {
      height: -1,
      index: -1
    };

    this.state = {
      rowsToRender: []
    };

    this.ref = null;

    this.updateRowsToRender = this.updateRowsToRender.bind(this);
  }
  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('virtualized-body will mount'); // eslint-disable-line no-console
    }

    // Stash only first few rows for the first rendering. We'll use
    // this data for initial measurements
    this.allRows = this.props.rows;

    this.setState({
      rowsToRender: this.allRows.slice(0, 3)
    });
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
        if (index !== this.lastRow.index) {
          this.measuredRows[index] = height;
        }
      },
      rows: this.rows
    };
  }
  render() {
    const { rowsToRender } = this.state;

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'rendering',
        rowsToRender.length, '/', this.props.rows.length,
        'rows',
        rowsToRender
      );
    }

    const { onRow, ...props } = this.props;

    return (
      <Body
        {...props}
        onRow={(row, rowIndex) => {
          // Tweak the height of the last row so that scrollbar looks fine.
          const { style, ...rowProps } = onRow ? onRow(row, rowIndex) : {};
          let customStyle = style;

          if (this.startIndex + rowIndex === this.lastRow.index) {
            customStyle = {
              ...style,
              height: this.lastRow.height
            };
          }

          return {
            'data-rowindex': this.startIndex + rowIndex,
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
    this.startIndex = startIndex;

    if (process.env.NODE_ENV !== 'production') {
      console.log( // eslint-disable-line no-console
        'measured sample', measuredSample,
        'measured rows', this.measuredRows,
        'average height', averageHeight,
        'body height', bodyHeight,
        'amount of rows to render', amountOfRowsToRender,
        'start index', startIndex,
        'scroll top', scrollTop,
        'last row', this.lastRow
      );
    }

    const rowsToRender = this.allRows.slice(
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

    const remainingHeight = (this.allRows.length - amountOfRowsToRender) * averageHeight;

    // Calculate the padding of the last row so we can match whole height. This
    // won't be totally accurate if row heights differ but should get close
    // enough in most cases.
    this.lastRow = {
      height: remainingHeight,
      index: startIndex + rowsToRender.length - 1 // eslint-disable-line no-mixed-operators
    };

    this.setState({ rowsToRender });
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
