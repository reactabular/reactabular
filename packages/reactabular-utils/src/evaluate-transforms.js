import { isFunction } from 'lodash';
import mergeProps from './merge-props';

function evaluateTransforms(transforms = [], value, extraParameters = {}) {
  if (process.env.NODE_ENV !== 'production') {
    if (!transforms.every(isFunction)) {
      throw new Error(
        'All transforms weren\'t functions!',
        transforms
      );
    }
  }

  return mergeProps(
    ...transforms.map(transform => transform(value, extraParameters))
  );
}

export default evaluateTransforms;
