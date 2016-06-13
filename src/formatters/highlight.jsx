import React from 'react';

export default getHighlights => {
  return value => {
    value = String(value); // deals with arrays/numbers/...

    const highlights = getHighlights(value);
    let children = [];
    let currentPosition = 0;
    let x = 0;

    for (x = 0; x < highlights.length; x++) {
      const nonMatchingPrefix = value.slice(
        currentPosition,
        highlights[x].startIndex
      );
      const matchingText = value.slice(
        highlights[x].startIndex,
        highlights[x].startIndex + highlights[x].length
      );

      currentPosition = highlights[x].startIndex + highlights[x].length;

      if (nonMatchingPrefix.length > 0) {
        children.push(
          <span key={x + '-nonmatch'}>{nonMatchingPrefix}</span>
        );
      }
      children.push(
        <span className='highlight' key={x + '-match'}>{matchingText}</span>
      );
    }
    children.push(
      <span key={x + '-remainder'}>{value.slice(currentPosition)}</span>
    );

    return <span className='search-result'>{children}</span>;
  };
};
