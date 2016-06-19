import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React from 'react';

import formatters from './formatters';
import predicates from './predicates';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: 'all',
      query: '',
    };

    this.onColumnChange = this.onColumnChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  componentDidMount() {
    this.props.onChange({
      [this.state.column]: this.state.query,
    });
  }
  render() {
    const {
      onChange, columns, data, i18n, ...props, // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <span {...props}>
        <SearchOptions
          onChange={this.onColumnChange} value={this.state.column}
          columns={columns} i18n={i18n}
        />
        <input onChange={this.onQueryChange} value={this.state.query}></input>
      </span>
    );
  }
  onColumnChange(event) {
    const column = event.target.value;
    const query = this.state.query;

    this.setState({ column });
    this.props.onChange({
      [column]: query,
    });
  }
  onQueryChange(event) {
    const column = this.state.column;
    const query = event.target.value;

    this.setState({ query });
    this.props.onChange({
      [column]: query,
    });
  }
}
Search.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string,
  }),
};
Search.defaultProps = {
  columns: [],
  data: [],
  onChange: () => {},
  i18n: {
    all: 'All',
  },
};

const SearchOptions = ({ columns, i18n, ...props }) => (
  <select {...props}>{
    getOptions(columns, i18n).map(({ name, value }) =>
      <option key={`${value}-option`} value={value}>{name}</option>
    )
  }</select>
);
SearchOptions.propTypes = {
  columns: React.PropTypes.array,
  i18n: React.PropTypes.object,
};

const getOptions = (columns, i18n) => (
  [{
    value: 'all',
    name: i18n.all,
  }].concat(columns.map(column => {
    if (column.property && column.header) {
      return {
        value: column.property,
        name: column.header,
      };
    }

    return null;
  }).filter(
    column => column && !React.isValidElement(column.name)
  ))
);

const searchColumn = (data, columns, column, query, options = {
  strategy: predicates.infix,
  transform: formatters.lowercase,
}) => {
  if (!query) {
    return data;
  }
  let ret = columns;

  if (column !== 'all') {
    ret = columns.filter(col => col.property === column);
  }

  return data.filter(row =>
    ret.filter(isColumnVisible.bind(this, options, query, row)).length > 0
  );
};

const isColumnVisible = (options, query, row, col) => {
  const property = col.property;
  const propertyValue = row[property];
  const value = col.value ? col.value(propertyValue) : propertyValue;
  const formatter = col.search || formatters.identity;
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

const matches = (column, value, query, options = {
  strategy: predicates.infix,
  transform: formatters.lowercase,
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

Search.searchColumn = searchColumn;
Search.search = search;
Search.matches = matches;

export default Search;
