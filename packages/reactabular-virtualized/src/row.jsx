import React from 'react';
import { bodyRowContextTypes } from './types';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  componentDidMount() {
    this.context.updateHeight(this.ref.offsetHeight);
  }
  shouldComponentUpdate() {
    // Skip rendering if not visible since VirtualizedBody might try to render
    // a few extra.
    return this.ref.offsetTop < this.context.offsetHeight + this.ref.offsetHeight;
  }
  render() {
    return (
      <tr
        {...this.props}
        ref={e => {
          if (e) {
            this.ref = e;
          }
        }}
      />
    );
  }
}
Row.contextTypes = bodyRowContextTypes;

export default Row;
