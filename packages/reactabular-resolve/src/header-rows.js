import { mergePropPair } from 'reactabular-utils';
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

  return mergeColumnProps(
    resolvedChildren.length ?
    [ret].concat([resolvedChildren]) :
    [ret]
  );
}

function mergeColumnProps(columns) {
  return columns.map(
    row => row.map(column => (
      column.header ? {
        props: mergePropPair(column.props, column.header.props),
        header: column.header,
        children: column.children || [], // TODO: test for this case
        column
      } : {}
    )
  ));
}

export default resolveHeaderRows;
