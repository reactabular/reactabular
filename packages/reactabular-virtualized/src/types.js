import PropTypes from 'prop-types';

const bodyRowContextTypes = {
  initialMeasurement: PropTypes.bool,
  updateHeight: PropTypes.func
};
const bodyRowTypes = {
  'data-rowkey': PropTypes.string
};
const bodyWrapperContextTypes = {
  startHeight: PropTypes.number,
  endHeight: PropTypes.number,
  showExtraRow: PropTypes.bool
};
const bodyWrapperTypes = {
  children: PropTypes.any
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
