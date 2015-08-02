'use strict';
var isString = require('lodash').isString;
var React = require('react/addons');

var formatters = require('./formatters');
var predicates = require('./predicates');

module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            columns: [],
            data: [],
            onChange: function onChange() {}
        };
    },

    getInitialState: function getInitialState() {
        return {
            column: 'all',
            query: ''
        };
    },

    getOptions: function getOptions() {
        var columns = this.props.columns;
        return [{
            value: 'all',
            name: 'All'
        }].concat(columns.map(function (column) {
            if (column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter(function (a) {
            return a;
        }));
    },

    render: function render() {
        return React.createElement(
            'span',
            { className: 'search' },
            React.createElement(
                'select',
                { onChange: this.onColumnChange, value: this.state.column },
                this.getOptions().map(function (option) {
                    return React.createElement(
                        'option',
                        { key: option.value + '-option', value: option.value },
                        option.name
                    );
                })
            ),
            React.createElement('input', { onChange: this.onQueryChange, value: this.state.query })
        );
    },

    onColumnChange: function onColumnChange(event) {
        var column = event.target.value;
        var query = this.state.query;
        this.setState({
            column: column
        });

        this.props.onChange({
            column: column,
            query: query
        });
    },

    onQueryChange: function onQueryChange(event) {
        var column = this.state.column;
        var query = event.target.value;
        this.setState({
            query: query
        });

        this.props.onChange({
            column: column,
            query: query
        });
    },

    componentDidMount: function componentDidMount() {
        this.props.onChange({
            column: this.state.column,
            query: this.state.query
        });
    }
});

module.exports.search = function (data, columns, column, query, options) {
    if (!query) {
        return data;
    }

    options = options || {
        strategy: predicates.infix,
        transform: formatters.lowercase
    };

    if (column !== 'all') {
        columns = columns.filter(function (col) {
            return col.property === column;
        });
    }

    return data.filter(function (row) {
        return columns.filter(isColumnVisible.bind(undefined, row)).length > 0;
    });

    function isColumnVisible(row, col) {
        var property = col.property;
        var value = row[property];
        var formatter = col.search || formatters.identity;
        var formattedValue = formatter(value);

        if (!formattedValue) {
            return false;
        }

        if (!isString(formattedValue)) {
            formattedValue = formattedValue.toString();
        }

        var predicate = options.strategy(options.transform(query));

        return predicate.evaluate(options.transform(formattedValue));
    }
};

module.exports.matches = function (column, value, query, options) {
    if (!query) {
        return {};
    }

    options = options || {
        strategy: predicates.infix,
        transform: formatters.lowercase
    };

    var predicate = options.strategy(options.transform(query));

    return predicate.matches(options.transform(value));
};