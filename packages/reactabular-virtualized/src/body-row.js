import React from 'react';
import isEqual from 'lodash/isEqual';
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

BodyRow.shouldComponentUpdate = function (nextProps) {
  const previousProps = this.props;

  // Update only if a row has not been measured and either
  // columns or rowData hasn't changed
  if (nextProps.rowData._measured) {
    return !(
      isEqual(previousProps.columns, nextProps.columns) &&
      isEqual(previousProps.rowData, nextProps.rowData)
    );
  }

  return true;
};

export default BodyRow;
