import React from 'react';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

// XXX: This has to be a class as otherwise Virtualized.Body won't work (ref issue)
class BodyWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
