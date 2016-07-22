import mergePropPair from './merge_prop_pair';

function evaluateTransforms(transforms = [], value, extraParameters = {}) {
  return transforms.
    map(transform => transform(value, extraParameters)).
    filter(p => p).
    reduce(mergePropPair, {}) || {};
}

export default evaluateTransforms;
