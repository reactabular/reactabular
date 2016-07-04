import merge from 'lodash/merge';

function resolveHeaderRows(columns) {
  let children = [];

  const ret = columns.map(column => {
    if (column.children && column.children.length) {
      children = children.concat(
        resolveHeaderRows(column.children)[0]
      );

      return {
        ...column,
        props: {
          ...column.props,
          colSpan: countChildren(column.children)
        }
      };
    }

    return {
      ...column,
      props: {
        ...column.props,
        rowSpan: countChildrenLevels(columns)
      }
    };
  });

  if (children.length) {
    return [ret].concat([children]);
  }

  return [ret];
}

function countChildren(children) {
  if (children.children) {
    return children.length + countChildren(children.children);
  }

  return children.length;
}

function countChildrenLevels(columns) {
  let maximumCount = 0;

  columns.forEach(column => {
    if (column.children) {
      maximumCount = Math.max(
        maximumCount,
        countChildrenLevels(column.children)
      );
    }
  });

  return maximumCount + 1;
}

function resolveBodyColumns(columns) {
  let ret = [];

  columns.forEach(column => {
    // If a column has children, skip cell specific configuration
    if (column.children) {
      ret = ret.concat(resolveBodyColumns(column.children));
    } else {
      ret.push(column);
    }
  });

  return ret;
}

function evaluateTransforms(transforms, value, extraParameters) {
  return transforms.reduceRight(
    (a, t) => {
      const result = t(value, extraParameters);

      return merge({}, a, result, {
        className: mergeClassNames(a.className, result.className)
      });
    },
    {}
  );
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
  countChildren,
  countChildrenLevels,
  resolveBodyColumns,
  evaluateTransforms,
  mergeClassNames
};
