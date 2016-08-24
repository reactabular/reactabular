import React from 'react';
import { bodyRowContextTypes } from './types';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  componentDidMount() {
    const { bodyHeight } = this.context;
    const e = this.ref;

    console.log('component did mount', bodyHeight, e.bodyHeight, e.offsetHeight, e.offsetTop);
  }
  componentDidUpdate() {
    const { bodyHeight } = this.context;
    const e = this.ref;

    console.log('component did update', bodyHeight, e.bodyHeight, e.offsetHeight, e.offsetTop);
  }
  shouldComponentUpdate() {
    const { bodyHeight } = this.context;
    const e = this.ref;

    console.log('should component update', bodyHeight, e.bodyHeight, e.offsetHeight, e.offsetTop);

    return true;
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
