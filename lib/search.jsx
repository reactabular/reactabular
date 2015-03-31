'use strict';
var isString = require('lodash/lang/isString');
var React = require('react/addons');

var formatters = require('./formatters');
var predicates = require('./predicates');


module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        onChange: React.PropTypes.func,
        columns: React.PropTypes.array,
    },

    render() {
        var columns = this.props.columns || [];
        var options = [{
            value: 'all',
            name: 'All'
        }].concat(columns.map((column) => {
            if(column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter(id));

        return (
            <span className='search'>
                <select ref='column' onChange={this.change}>{options.map((option) =>
                    <option key={option.value + '-option'} value={option.value}>{option.name}</option>
                )
                }</select>
                <input ref='query' onChange={this.change}></input>
            </span>
        );
    },

    change() {
        (this.props.onChange || noop)({
            search: {
                query: this.refs.query.getDOMNode().value,
                column: this.refs.column.getDOMNode().value,
            }
        });
    },
});

module.exports.search = function(search, columns, data) {
    var query = search.query;
    var column = search.column;

    if(!query) {
        return data;
    }

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

        if (!formattedValue) {
            return false;
        }

        if(!isString(formattedValue)) {
            formattedValue = formattedValue.toString();
        }

        // TODO: allow strategy to be passed, now just defaulting to prefix
        var predicate = predicates.prefix(query.toLowerCase());

        return predicate.matches(formattedValue.toLowerCase());
    }
};

module.exports.highlight = function(getQuery) {
    return function(value) {
        var query = getQuery();

        if(query) {
            var match = value.slice(0, query.length);

            if(query.toLowerCase() !== match.toLowerCase()) {
                return value;
            }

            var rest = value.slice(query.length);

            return (
                <span className='search-result'>
                    <span className='highlight'>{match}</span>
                    <span className='rest'>{rest}</span>
                </span>
            );
        }

        return value;
    };
};

function id(a) {
    return a;
}

function noop() {}
