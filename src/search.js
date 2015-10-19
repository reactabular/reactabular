'use strict';
var isNumber = require('lodash').isNumber;
var isString = require('lodash').isString;
var React = require('react');

var formatters = require('./formatters');
var predicates = require('./predicates');


module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            columns: [],
            data: [],
            onChange: () => {},
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
        return [{
            value: 'all',
            name: 'All'
        }].concat(columns.map((column) => {
            if(column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter((a) => a));
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
            column: column,
            query: query,
        });
    },

    onQueryChange(event) {
        var column = this.state.column;
        var query = event.target.value;
        this.setState({
            query: query
        });

        this.props.onChange({
            column: column,
            query: query,
        });
    },

    componentDidMount() {
        this.props.onChange({
            column: this.state.column,
            query: this.state.query
        });
    },
});

module.exports.search = (data, columns, column, query, options) => {
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

module.exports.matches = (column, value, query, options) => {
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
