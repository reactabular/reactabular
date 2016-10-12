function unpack({
  parentField = 'parent',
  parent,
  idField = 'id'
} = {}) {
  return (rows) => {
    if (!Array.isArray(rows)) {
      return [];
    }

    if (!rows.length) {
      return rows;
    }

    return [].concat(
      ...rows.map(({ children, ...node }) => {
        const d = parent ? {
          ...node,
          [parentField]: parent
        } : node;

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
}

export default unpack;
