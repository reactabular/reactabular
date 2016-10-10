import countRowSpan from './count-row-span';

function resolveHeaderRows(columns = []) {
  let resolvedChildren = [];

  const ret = columns.map((column) => {
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

export default resolveHeaderRows;
