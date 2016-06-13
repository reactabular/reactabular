import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React from 'react';

import formatters from './formatters';
import predicates from './predicates';

const Search = React.createClass({
    displayName: 'Search',

    propTypes: {
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func,
        i18n: React.PropTypes.shape({
            all: React.PropTypes.string
        })
    },

    getDefaultProps() {
        return {
            columns: [],
            data: [],
            onChange: () => {},
            i18n: {
                all: 'All'
            }
        };
    },

    getInitialState() {
        return {
            column: 'all',
            query: ''
        };
    },

    getOptions() {
        var columns = this.props.columns;
        var i18n = this.props.i18n;

        return [{
            value: 'all',
            name: i18n.all
        }].concat(columns.map((column) => {
            if(column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter((column) => {
            return column && !React.isValidElement(column.name);
        }));
    },

    render() {
        return (
            <span className='search'>
                <select onChange={this.onColumnChange} value={this.state.column}>{this.getOptions().map((option) =>
                    <option key={option.value + '-option'} value={option.value}>{option.name}</option>
                )
                }</select>
                <input onChange={this.onQueryChange} value={this.state.query}></input>
            </span>
        );
    },

    onColumnChange(event) {
        var column = event.target.value;
        var query = this.state.query;
        this.setState({
            column: column
        });

        this.props.onChange({
            [column]: query
        });
    },

    onQueryChange(event) {
        var column = this.state.column;
        var query = event.target.value;
        this.setState({
            query: query
        });
        this.props.onChange({
            [column]: query
        });
    },

    componentDidMount() {
        this.props.onChange({
            [this.state.column]: this.state.query
        });
    },
});

const searchColumn = (data, columns, column, query, options) => {
    if(!query) {
        return data;
    }

    options = options || {
        strategy: predicates.infix,
        transform: formatters.lowercase
    };

    if(column !== 'all') {
        columns = columns.filter((col) =>
            col.property === column
        );
    }

    return data.filter((row) =>
        columns.filter(isColumnVisible.bind(this, row)).length > 0
    );

    function isColumnVisible(row, col) {
        var property = col.property;
        var value = row[property];
        var formatter = col.search || formatters.identity;
        var formattedValue = formatter(value);

        if (!formattedValue && isNaN(formattedValue)) {
            return false;
        }

        if (isNumber(formattedValue)) {
            formattedValue = formattedValue.toString();
        }
        else if (!isString(formattedValue)) {
            formattedValue = '';
        }

        var predicate = options.strategy(options.transform(query));

        return predicate.evaluate(options.transform(formattedValue));
    }
};

const search = (data, columns, query, options) => {
    if (!query) {
        return data;
    }

    var searchColumns = Object.keys(query);

    data = searchColumns.reduce(
        (filteredData, column) => {
            return searchColumn(filteredData, columns, column, query[column], options);
        },
        data
    );

    return data;
};

const matches = (column, value, query, options) => {
    if(!query) {
        return {};
    }

    options = options || {
        strategy: predicates.infix,
        transform: formatters.lowercase
    };

    var predicate = options.strategy(options.transform(query));

    return predicate.matches(options.transform(value));
};

Search.searchColumn = searchColumn;
Search.search = search;
Search.matches = matches;

export default Search;
