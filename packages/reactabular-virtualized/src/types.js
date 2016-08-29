import React from 'react';

const bodyRowContextTypes = {
  updateHeight: React.PropTypes.func
};
const bodyRowTypes = {
  'data-rowindex': React.PropTypes.number
};
const bodyWrapperContextTypes = {
  startPadding: React.PropTypes.number,
  endPadding: React.PropTypes.number
};
const bodyWrapperTypes = {
  children: React.PropTypes.any
};
const bodyChildContextTypes = {
  ...bodyRowContextTypes,
  ...bodyWrapperContextTypes
};

export {
  bodyChildContextTypes,
  bodyRowContextTypes,
  bodyRowTypes,
  bodyWrapperContextTypes,
  bodyWrapperTypes
};
