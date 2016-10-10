const infix = queryTerm => ({
  evaluate(searchText = '') {
    if (!searchText) {
      return false;
    }

    if (Array.isArray(searchText)) {
      return searchText.some(v => this.evaluate(v));
    }

    return searchText.indexOf(queryTerm) !== -1;
  },
  matches(searchText = '') {
    if (!searchText) {
      return [];
    }

    if (Array.isArray(searchText)) {
      return searchText.reduce(
        (result, text, index) => {
          const search = this.matches(text);

          if (search.length) {
            result[index] = search; // eslint-disable-line no-param-reassign
          }

          return result;
        },
        new Array(searchText.length)
      );
    }

    const splitString = searchText.split(queryTerm);
    const result = [];
    let currentPosition = 0;

    for (let x = 0; x < splitString.length; x += 1) {
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

    if (Array.isArray(searchText)) {
      return searchText.some(v => this.evaluate(v));
    }

    return searchText.indexOf(queryTerm) === 0;
  },
  matches(searchText = '') {
    if (!searchText) {
      return [];
    }

    if (Array.isArray(searchText)) {
      return searchText.reduce(
        (result, text, index) => {
          const search = this.matches(text);

          if (search.length) {
            result[index] = search; // eslint-disable-line no-param-reassign
          }

          return result;
        },
        new Array(searchText.length)
      );
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
