import get from 'lodash/get';

const multipleColumns = ({
  data, columns, query, strategy, transform
}) => {
  if (!query) {
    return data;
  }

  return Object.keys(query).reduce(
    (filteredData, searchColumn) =>
      singleColumn({
        data: filteredData,
        columns,
        searchColumn,
        query: query[searchColumn],
        strategy,
        transform
      }),
    data
  );
};

const singleColumn = ({
  data, columns, searchColumn = 'all', query, strategy, transform
}) => {
  if (!query) {
    return data;
  }

  let ret = columns;

  if (searchColumn !== 'all') {
    ret = columns.filter(col => col.cell && col.cell.property === searchColumn);
  }

  return data.filter(row => ret.filter(column => _columnMatches({
    query, column, strategy, transform, row
  })).length > 0);
};

const _columnMatches = ({ // eslint-disable-line no-underscore-dangle
  query, column = { cell: {} }, row,
  strategy = strategies.infix, transform = v => v.toLowerCase()
}) => {
  const property = column.cell.property;
  const value = get(row, property);
  const formatter = column.cell.resolve || (a => a);
  let formattedValue = formatter(value, { cellData: row, property });

  if (typeof formattedValue === 'undefined' || formattedValue === null) {
    formattedValue = '';
  }

  formattedValue = formattedValue.toString ? formattedValue.toString() : '';

  return strategy(transform(query)).evaluate(transform(formattedValue));
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
