export default prefix => ({
  evaluate(searchText) {
    return searchText.indexOf(prefix) === 0;
  },
  matches(searchText) {
    const prefixIndex = searchText.indexOf(prefix);

    if (prefixIndex === 0) {
      return [
        {
          startIndex: 0,
          length: prefix.length,
        },
      ];
    }

    return [];
  },
});
