import React from 'react';
//import { bodyRowContextTypes, bodyRowTypes } from './types';

class BodyWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { children, ...props } = this.props;

    return React.createElement(
      'tbody',
      props,
      children // TODO: attach start/end padding here
    );
  }
}
// TODO: dig start/end from context
//BodyWrapper.contextTypes = bodyRowContextTypes;
//BodyWrapper.propTypes = bodyRowTypes;

export default BodyWrapper;
