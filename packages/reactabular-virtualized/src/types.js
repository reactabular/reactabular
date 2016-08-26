import React from 'react';

const types = {
  offsetHeight: React.PropTypes.number,
  scrollTop: React.PropTypes.number,
  updateHeight: React.PropTypes.func,
  rows: React.PropTypes.object,
  previousRow: React.PropTypes.object
};
const bodyChildContextTypes = types;
const bodyRowContextTypes = types;
const bodyRowTypes = {
  'data-rowindex': React.PropTypes.number
};

export {
  bodyChildContextTypes,
  bodyRowContextTypes,
  bodyRowTypes
};
