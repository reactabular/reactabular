import React from 'react';

const highlightCell = (
  value,
  { rowData, property } = { rowData: { _highlights: {} } }
) => (
  highlightValue(
    value,
    rowData._highlights && rowData._highlights[property]
  )
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
      ret._highlights[property] = matches({
        value: resolvedValue,
        query: query[property] || query.all
      });
    });

    return ret;
  });
}

export default {
  cell: highlightCell,
  value: highlightValue,
  highlighter
};
