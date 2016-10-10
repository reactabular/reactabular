import React from 'react';
import { bodyRowContextTypes, bodyRowTypes } from './types';

class BodyRow extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    this.updateHeight = this.updateHeight.bind(this);
  }
  componentDidMount() {
    this.updateHeight();
  }
  componentDidUpdate() {
    // Capture height data only during initial measurement for performance.
    // This loses some accuracy if row height changes, but it's good enough
    // for most purposes.
    if (this.context.initialMeasurement) {
      this.updateHeight();
    }
  }
  render() {
    return React.createElement(
      'tr',
      {
        ...this.props,
        ref: (e) => {
          if (e) {
            this.ref = e;
          }
        }
      }
    );
  }
  updateHeight() {
    this.context.updateHeight(
      this.props['data-rowkey'],
      this.ref.offsetHeight
    );
  }
}
BodyRow.contextTypes = bodyRowContextTypes;
BodyRow.propTypes = bodyRowTypes;

// Tell reactabular-table to update anyway.
BodyRow.shouldComponentUpdate = true;

export default BodyRow;
