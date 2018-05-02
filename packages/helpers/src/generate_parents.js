function generateParents(rows, idField = 'id') {
  let previousParent;

  return rows.map((d) => {
    const ret = {
      ...d,
      parent: previousParent
    };

    // Generate child instead of a sibling
    if (previousParent && Math.random() > 0.8) {
      // Do nothing
    } else if (Math.random() > 0.8) {
      // Back to root
      previousParent = null;
    } else {
      previousParent = d[idField];
    }

    return ret;
  });
}

export default generateParents;
