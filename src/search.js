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

const _columnMatches = ({
  query,
  column = { cell: {} },
  row,
  strategy = strategies.infix,
  transform = (v = '') => v && v.toLowerCase && v.toLowerCase()
}) => {
  const property = column.cell.property;
  // Pick resolved value by convention
  const resolvedValue = String(row[`_${property}`] || row[property]);

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
