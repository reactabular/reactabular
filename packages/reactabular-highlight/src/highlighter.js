function highlighter({ columns, matches, query } = {}) {
  if (!columns) {
    throw new Error('highlighter - Missing columns!');
  }
  if (!matches) {
    throw new Error('highlighter - Missing matches!');
  }
  if (!query) {
    throw new Error('highlighter - Missing query!');
  }

  return rows => rows.map((row) => {
    const ret = {
      _highlights: {}
    };

    columns.forEach((column) => {
      const property = column.property;
      const value = row[property];
      // Pick resolved value by convention
      const resolvedValue = row[`_${property}`] || value;

      ret[property] = value;

      // Retain possibly resolved value
      if (resolvedValue !== value) {
        ret[`_${property}`] = resolvedValue;
      }

      if (typeof property === 'undefined') {
        return;
      }

      // Stash highlighted value based on index
      // so it can be extracted later for highlighting
      ret._highlights[property] = matches({
        value: resolvedValue,
        query: query[property] || query.all
      });
    });

    // Capture original row data too
    return {
      ...row,
      ...ret
    };
  });
}

export default highlighter;
