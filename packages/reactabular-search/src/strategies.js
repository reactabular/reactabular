const infix = queryTerm => ({
  evaluate(searchText = '') {
    if (!searchText) {
      return false;
    }

    return searchText.indexOf(queryTerm) !== -1;
  },
  matches(searchText = '') {
    if (!searchText) {
      return [];
    }

    const splitString = searchText.split(queryTerm);
    const result = [];
    let currentPosition = 0;

    for (let x = 0; x < splitString.length; x++) {
      result.push({
        startIndex: currentPosition + splitString[x].length,
        length: queryTerm.length
      });

      currentPosition += splitString[x].length + queryTerm.length;
    }

    result.pop();

    return result;
  }
});

const prefix = queryTerm => ({
  evaluate(searchText = '') {
    if (!searchText) {
      return false;
    }

    return searchText.indexOf(queryTerm) === 0;
  },
  matches(searchText = '') {
    if (!searchText) {
      return [];
    }

    const prefixIndex = searchText.indexOf(queryTerm);

    if (prefixIndex === 0) {
      return [
        {
          startIndex: 0,
          length: queryTerm.length
        }
      ];
    }

    return [];
  }
});

export default {
  infix,
  prefix
};
