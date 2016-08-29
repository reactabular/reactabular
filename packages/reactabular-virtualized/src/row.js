import React from 'react';
import { bodyRowContextTypes, bodyRowTypes } from './types';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  componentDidMount() {
    // TODO: skip for last row - check through a prop
    this.context.updateHeight(this.props['data-rowindex'], this.ref.offsetHeight);
  }
  render() {
    return React.createElement(
      'tr',
      {
        ...this.props,
        ref: e => {
          if (e) {
            this.ref = e;
          }
        }
      }
    );
  }
}
Row.contextTypes = bodyRowContextTypes;
Row.propTypes = bodyRowTypes;

export default Row;
