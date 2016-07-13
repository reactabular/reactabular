function highlight({ columns, matches, query }) {
  return rows => rows.map(row => {
    const ret = {
      _highlights: {}
    };

    columns.forEach(column => {
      // XXX: same resolver as for search -> reuse
      const property = column.cell.property;
      const value = row[property];
      const resolver = column.cell.resolve || (a => a);
      let resolvedValue = resolver(value, { rowData: row, property });

      if (typeof resolvedValue === 'undefined' || resolvedValue === null) {
        resolvedValue = '';
      }

      resolvedValue = resolvedValue.toString ? resolvedValue.toString() : '';

      ret[property] = row[property];

      // Stash highlighted value based on index
      // so it can be extracted later for highlighting
      ret._highlights[property] = matches({ // eslint-disable-line no-underscore-dangle
        value: resolvedValue,
        query: query[property] || query.all
      });
    });

    return ret;
  });
}

export default highlight;
