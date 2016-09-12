import React from 'react';

const bodyRowContextTypes = {
  initialMeasurement: React.PropTypes.bool,
  updateHeight: React.PropTypes.func
};
const bodyRowTypes = {
  'data-rowkey': React.PropTypes.string
};
const bodyWrapperContextTypes = {
  startHeight: React.PropTypes.number,
  endHeight: React.PropTypes.number,
  showExtraRow: React.PropTypes.bool
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
