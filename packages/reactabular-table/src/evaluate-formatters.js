import { isFunction } from 'lodash';

function evaluateFormatters(formatters) {
  return (value, extra) => (
    formatters.reduce((parameters, formatter) => {
      if (isFunction(formatter)) {
        return {
          value: formatter(parameters.value, parameters.extra),
          extra
        };
      }
      if (formatter.match(parameters.value, parameters.extra)) {
        return {
          value: formatter.evaluate(parameters.value, parameters.extra),
          extra
        };
      }
      return parameters;
    }, { value, extra }).value
  );
}

export default evaluateFormatters;
