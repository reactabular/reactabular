import React from 'react';
import { bodyWrapperContextTypes, bodyWrapperTypes } from './types';

class BodyWrapper extends React.Component {
  render() {
    const { startPadding, endPadding } = this.context;
    const { children, ...props } = this.props;

    console.log('body wrapper', startPadding, endPadding, children);

    return React.createElement(
      'tbody',
      props,
      children // TODO: attach start/end padding here
    );
  }
}
BodyWrapper.contextTypes = bodyWrapperContextTypes;
BodyWrapper.propTypes = bodyWrapperTypes;

export default BodyWrapper;
