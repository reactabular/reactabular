function resolveHeaderRows(columns = []) {
  let resolvedChildren = [];

  const ret = columns.map(column => {
    const { children, ...col } = column;

    if (children && children.length) {
      resolvedChildren = resolvedChildren.concat(
        resolveHeaderRows(children)[0]
      );

      return {
        ...col,
        props: {
          ...col.props,
          colSpan: children.length
        }
      };
    }

    return {
      ...col,
      props: {
        ...col.props,
        rowSpan: countRowSpan(columns)
      }
    };
  });

  if (resolvedChildren.length) {
    return [ret].concat([resolvedChildren]);
  }

  return [ret];
}

function countRowSpan(columns) {
  let maximumCount = 0;

  columns.forEach(column => {
    if (column.children) {
      maximumCount = Math.max(
        maximumCount,
        countRowSpan(column.children)
      );
    }
  });

  return maximumCount + 1;
}

function resolveBodyColumns(columns) {
  let ret = [];

  columns.forEach(column => {
    // If a column has children, skip cell specific configuration
    if (column.children && column.children.length) {
      ret = ret.concat(resolveBodyColumns(column.children));
    } else {
      ret.push(column);
    }
  });

  return ret;
}

function evaluateTransforms(transforms = [], value, extraParameters = {}) {
  return transforms.
    map(transform => transform(value, extraParameters)).
    filter(p => p).
    reduce(mergePropPair, {}) || {};
}

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

function mergeClassNames(a, b) {
  if (a && b) {
    return `${a} ${b}`;
  }

  // Either a or b at this point
  return (a || '') + (b || '');
}

export {
  resolveHeaderRows,
  countRowSpan,
  resolveBodyColumns,
  evaluateTransforms,
  mergePropPair,
  mergeClassNames
};
