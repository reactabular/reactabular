function highlight({ matches, query }) {
  return rows => rows.map(row => {
    const ret = {
      _highlights: {}
    };

    Object.keys(row).forEach(key => {
      const value = row[key];

      ret[key] = value;

      // Stash highlighted value based on index
      // so it can be extracted later for highlighting
      ret._highlights[key] = matches({ // eslint-disable-line no-underscore-dangle
        value,
        query: query[key] || query.all
      });
    });

    return ret;
  });
}

export default highlight;
