function flatten({
  tree,
  parentField = 'parent',
  parent,
  idField = 'id'
}) {
  if (!Array.isArray(tree)) {
    return [];
  }

  if (!tree.length) {
    return tree;
  }

  return [].concat(
    ...tree.map(({ children, ...node }) => {
      const d = parent ? {
        ...node,
        [parentField]: parent
      } : node;

      return [d].concat(
        flatten({
          tree: children,
          parentField,
          parent: d[idField],
          idField
        })
      );
    })
  );
}

export default flatten;
