import isFunction from 'lodash/isFunction';
import mergePropPair from './merge-prop-pair';

function evaluateTransforms(transforms = [], value, extraParameters = {}) {
  if (process.env.NODE_ENV !== 'production') {
    if (!transforms.every(isFunction)) {
      throw new Error(
        'All transforms weren\'t functions!',
        transforms
      );
    }
  }

  return transforms.map(transform => transform(value, extraParameters))
    .filter(p => p)
    .reduce(mergePropPair, {}) || {};
}

export default evaluateTransforms;
