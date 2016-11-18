import countRowSpan from './count-row-span';

function resolveHeaderRows(columns = []) {
  let resolvedChildren = [];

  const ret = columns.map((column) => {
    const { children } = column;

    if (children && children.length) {
      resolvedChildren = resolvedChildren.concat(
        resolveHeaderRows(children)[0]
      );

      return {
        ...column,
        props: {
          colSpan: children.length,
          ...column.props
        }
      };
    }

    return {
      ...column,
      props: {
        rowSpan: countRowSpan(columns),
        ...column.props
      }
    };
  });

  if (resolvedChildren.length) {
    return [ret].concat([resolvedChildren]);
  }

  return [ret];
}

export default resolveHeaderRows;
