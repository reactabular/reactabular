import React from 'react';
import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends React.Component {
  constructor(props) {
    super(props);

    this.measuredRows = [];
    this.allRows = [];
    this.rowsToRender = [];
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

    // TODO: mark and render a special row to take the remaining space based on
    // measurements
    return (
      <Body
        {...this.props}
        rows={this.rowsToRender}
        ref={e => {
          if (e) {
            this.ref = e;
          }
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
