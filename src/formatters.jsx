import React from 'react';

const highlighted = (value, { rowData, property } = { rowData: { _highlights: {} } }) => (
  highlightValue(value, rowData._highlights[property]) // eslint-disable-line max-len, no-underscore-dangle
);

const highlightValue = (value, highlights) => {
  if (!highlights) {
    return <span>{value}</span>;
  }

  const val = String(value); // deals with arrays/numbers/...

  let children = [];
  let currentPosition = 0;
  let x = 0;

  for (x = 0; x < highlights.length; x++) {
    const nonMatchingPrefix = val.slice(
      currentPosition,
      highlights[x].startIndex
    );
    const matchingText = val.slice(
      highlights[x].startIndex,
      highlights[x].startIndex + highlights[x].length
    );

    currentPosition = highlights[x].startIndex + highlights[x].length;

    if (nonMatchingPrefix.length > 0) {
      children.push(
        <span key={`${x}-nonmatch`}>{nonMatchingPrefix}</span>
      );
    }
    children.push(
      <span className="highlight" key={`${x}-match`}>{matchingText}</span>
    );
  }
  children.push(
    <span key={`${x}-remainder`}>{val.slice(currentPosition)}</span>
  );

  return <span className="search-result">{children}</span>;
};

export default {
  highlighted,
  highlightValue
};
