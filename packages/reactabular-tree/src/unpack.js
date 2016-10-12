import omit from 'lodash/omit';

const unpack = ({
  parentField = 'parent',
  childrenField = 'children',
  idField = 'id',
  parent
} = {}) => (rows) => {
  if (!Array.isArray(rows)) {
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
