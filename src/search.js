const multipleColumns = ({
  columns, query, strategy, transform
}) => data => (
  query ?
    Object.keys(query).reduce(
      (filteredData, searchColumn) =>
        singleColumn({
          columns,
          searchColumn,
          query: query[searchColumn],
          strategy,
          transform
        })(filteredData),
      data
    )
  : data
);

const singleColumn = ({
  columns, searchColumn = 'all', query, strategy, transform
}) => rows => {
  if (!query) {
    return rows;
  }

  let ret = columns;

  if (searchColumn !== 'all') {
    ret = columns.filter(col => col.cell && col.cell.property === searchColumn);
  }

  return rows.filter(row => ret.filter(column => _columnMatches({
    query, column, strategy, transform, row
  })).length > 0);
};

const _columnMatches = ({ // eslint-disable-line no-underscore-dangle
  query,
  column = { cell: {} },
  row,
  strategy = strategies.infix,
  transform = v => v.toLowerCase()
}) => {
  // XXX: same resolver as for highlight -> reuse
  const property = column.cell.property;
  const value = row[property];
  const resolver = column.cell.resolve || (a => a);
  let resolvedValue = resolver(value, { rowData: row, property });

  if (typeof resolvedValue === 'undefined' || resolvedValue === null) {
    resolvedValue = '';
  }

  resolvedValue = resolvedValue.toString ? resolvedValue.toString() : '';

  return strategy(transform(query)).evaluate(transform(resolvedValue));
};

const matches = ({
  value, query, strategy = strategies.infix, transform = v => v.toLowerCase()
} = {}) => {
  if (!query) {
    return {};
  }

  const val = value && value.toString ? value.toString() : '';

  return strategy(transform(query)).matches(transform(val));
};

const infix = queryTerm => ({
  evaluate(searchText) {
    return searchText.indexOf(queryTerm) !== -1;
  },
  matches(searchText) {
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
  evaluate(searchText) {
    return searchText.indexOf(queryTerm) === 0;
  },
  matches(searchText) {
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

const strategies = {
  infix,
  prefix
};

export default {
  multipleColumns,
  singleColumn,
  _columnMatches,
  matches,
  strategies
};
