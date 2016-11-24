import { isArray, omit } from 'lodash';

const unpack = ({
  parentField = 'parent',
  childrenField = 'children',
  idField = 'id',
  parent
} = {}) => (rows) => {
  if (!isArray(rows)) {
    return [];
  }

  if (!rows.length) {
    return rows;
  }

  return [].concat(
    ...rows.map((node) => {
      const children = node[childrenField];
      const d = parent ? {
        ...omit(node, childrenField),
        [parentField]: parent
      } : omit(node, childrenField);

      if (children) {
        d._isParent = true;
      }

      return [d].concat(
        unpack({
          parentField,
          parent: d[idField],
          idField
        })(children)
      );
    })
  );
};

export default unpack;
