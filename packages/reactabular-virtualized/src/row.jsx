import React from 'react';
import { bodyRowContextTypes } from './types';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  componentDidMount() {
    const { offsetHeight, scrollTop } = this.context;
    const e = this.ref;

    console.log('component did mount', scrollTop, offsetHeight, e.offsetHeight, e.offsetTop);
  }
  componentDidUpdate() {
    const { offsetHeight, scrollTop } = this.context;
    const e = this.ref;

    console.log('component did update', scrollTop, offsetHeight, e.offsetHeight, e.offsetTop);
  }
  shouldComponentUpdate() {
    const { offsetHeight, scrollTop } = this.context;
    const e = this.ref;

    console.log('should component update', scrollTop, offsetHeight, e.offsetHeight, e.offsetTop);

    return e.offsetTop < offsetHeight + e.offsetHeight;
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
