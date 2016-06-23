import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

const search = (data, columns, query, options) => {
  if (!query) {
    return data;
  }

  return Object.keys(query).reduce(
    (filteredData, column) =>
      searchColumn(
        filteredData, columns, column, query[column], options
      ),
    data
  );
};

const searchColumn = (data, columns, column, query, options = {
  strategy: predicates.infix,
  transform: value => value.toLowerCase(),
}) => {
  if (!query) {
    return data;
  }
  let ret = columns;

  if (column !== 'all') {
    ret = columns.filter(col => col.cell && col.cell.property === column);
  }

  return data.filter(row =>
    ret.filter(isColumnVisible.bind(this, options, query, row)).length > 0
  );
};

const isColumnVisible = (options, query, row, col) => {
  const property = col.cell.property;
  const value = get(row, property);
  const formatter = (col.cell && col.cell.value) || (a => a);
  let formattedValue = formatter(value);

  if (!formattedValue && isNaN(formattedValue)) {
    return false;
  }

  if (isNumber(formattedValue)) {
    formattedValue = formattedValue.toString();
  } else if (!isString(formattedValue)) {
    formattedValue = '';
  }

  return options.strategy(
    options.transform(query)
  ).evaluate(
    options.transform(formattedValue)
  );
};

const matches = (column, value, query, options = {
  strategy: predicates.infix,
  transform: v => v.toLowerCase(),
}) => {
  if (!query) {
    return {};
  }

  return options.strategy(
    options.transform(query)
  ).matches(
    options.transform(value)
  );
};

const infix = value => ({
  evaluate(searchText) {
    return searchText.indexOf(value) !== -1;
  },
  matches(searchText) {
    const splitString = searchText.split(value);
    const result = [];
    let currentPosition = 0;

    for (let x = 0; x < splitString.length; x++) {
      result.push({
        startIndex: currentPosition + splitString[x].length,
        length: value.length,
      });

      currentPosition += splitString[x].length + value.length;
    }

    result.pop();

    return result;
  },
});

const prefix = value => ({
  evaluate(searchText) {
    return searchText.indexOf(value) === 0;
  },
  matches(searchText) {
    const prefixIndex = searchText.indexOf(value);

    if (prefixIndex === 0) {
      return [
        {
          startIndex: 0,
          length: value.length,
        },
      ];
    }

    return [];
  },
});

const predicates = {
  infix,
  prefix,
};

search.column = searchColumn;
search.matches = matches;
search.predicates = predicates;

export default search;
