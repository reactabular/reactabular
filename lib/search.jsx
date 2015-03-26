'use strict';
var _ = require('lodash');
var React = require('react/addons');

var formatters = require('./formatters');
var predicates = require('./predicates');


module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        strategy: React.PropTypes.func,
        onResult: React.PropTypes.func,
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
    },

    getDefaultProps() {
        return {
            strategy: predicates.prefix
        };
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
        var query = this.refs.query.getDOMNode().value;
        var column = this.refs.column.getDOMNode().value;

        this.search(query, column);
    },

    search(query, column) {
        if(!this.props.columns) {
            return;
        }

        var data = this.props.data || [];
        var columns = this.props.columns;

        if(column !== 'all') {
            columns = this.props.columns.filter((col) =>
                col.property === column
            );
        }

        (this.props.onResult || noop)({
            search: {
                data: data.filter((row) =>
                    columns.filter(isColumnVisible.bind(this, row)).length > 0
                ),
                query: query,
            }
        });

        function isColumnVisible(row, col) {
            var property = col.property;
            var value = row[property];
            var formatter = col.search || formatters.identity;
            var formattedValue = formatter(value);

            if (!formattedValue) {
                return false;
            }

            if(!_.isString(formattedValue)) {
                formattedValue = formattedValue.toString();
            }

            var predicate = this.props.strategy(query.toLowerCase());

            return predicate.matches(formattedValue.toLowerCase());
        }
    },
});

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
