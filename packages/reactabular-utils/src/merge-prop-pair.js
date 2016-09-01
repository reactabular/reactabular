import mergeClassNames from './merge-class-names';

function mergePropPair(a = {}, b = {}) {
  const ret = {
    ...a,
    ...b,
    style: { ...a.style, ...b.style },
    className: mergeClassNames(a.className, b.className)
  };

  if (a.children || b.children) {
    ret.children = { ...b.children, ...a.children }; // Reverse order
  }

  return ret;
}

export default mergePropPair;
