import { omit } from 'lodash';
import countRowSpan from './count-row-span';

function resolveHeaderRows({
  columns,
  childrenField = 'children'
}) {
  let resolvedChildren = [];

  const ret = columns.map((column) => {
    const children = column[childrenField];
    const col = omit(column, [childrenField]);

    if (children && children.length) {
      resolvedChildren = resolvedChildren.concat(
        resolveHeaderRows({
          columns: children,
          childrenField
        })[0]
      );

      return {
        ...col,
        props: {
          colSpan: children.length,
          ...col.props
        }
      };
    }

    return {
      ...col,
      props: {
        rowSpan: countRowSpan(columns),
        ...col.props
      }
    };
  });

  return resolvedChildren.length ? [ret].concat([resolvedChildren]) : [ret];
}

export default resolveHeaderRows;
