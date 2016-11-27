function evaluateFormatters(formatters) {
  return (value, extra) => (
    formatters.reduce((parameters, formatter) => (
      {
        value: formatter(parameters.value, parameters.extra),
        extra
      }
    ), { value, extra }).value
  );
}

export default evaluateFormatters;
