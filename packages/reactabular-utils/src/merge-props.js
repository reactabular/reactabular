import { mergeWith } from 'lodash';
import classNames from 'classnames';

function mergePropPair(first, ...props) {
  // Avoid mutating the first prop collection
  return mergeWith(mergeWith({}, first), ...props, (a, b, key) => {
    if (key === 'children') {
      // Children have to be merged in reverse order for Reactubular
      // logic to work.
      return { ...b, ...a };
    }

    if (key === 'className') {
      // Process class names through classNames to merge properly
      // as a string.
      return classNames(a, b);
    }

    return undefined;
  });
}

export default mergePropPair;
