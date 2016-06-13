export default infix => ({
  evaluate(searchText) {
    return searchText.indexOf(infix) !== -1;
  },
  matches(searchText) {
    const splitString = searchText.split(infix);
    const matches = [];
    let currentPosition = 0;

    for (let x = 0; x < splitString.length; x++) {
      matches.push({
        startIndex: currentPosition + splitString[x].length,
        length: infix.length,
      });
      currentPosition += splitString[x].length + infix.length;
    }

    matches.pop();

    return matches;
  },
});
