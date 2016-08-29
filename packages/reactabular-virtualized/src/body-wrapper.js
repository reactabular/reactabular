import React from 'react';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

class BodyWrapper extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const { startHeight, endHeight } = this.context;
    const startRow = React.createElement('tr', {
      style: {
        height: startHeight
      }
    });
    const endRow = React.createElement('tr', {
      style: {
        height: endHeight
      }
    });

    return React.createElement(
      'tbody',
      props,
      [startRow].concat(children).concat(endRow)
    );
  }
}
BodyWrapper.contextTypes = bodyWrapperContextTypes;
BodyWrapper.propTypes = bodyWrapperTypes;

export default BodyWrapper;
