'use strict';
var isString = require('lodash/lang/isString');
var React = require('react/addons');

var formatters = require('./formatters');
var predicates = require('./predicates');


module.exports = React.createClass({
    displayName: 'Search',

    propTypes: {
        columns: React.PropTypes.array,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func,
        options: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            columns: [],
            data: [],
            options: {
                strategy: predicates.infix,
                transform: formatters.lowercase
            }
        };
    },

    getInitialState() {
        return {
            column: 'all',
            query: ''
        };
    },

    render() {
        var columns = this.props.columns;
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
                <select ref='column' onChange={this.change} value={this.state.column}>{options.map((option) =>
                    <option key={option.value + '-option'} value={option.value}>{option.name}</option>
                )
                }</select>
                <input ref='query' onChange={this.change} value={this.state.query}></input>
            </span>
        );
    },

    change() {
        // TODO: Determine if there's a better way to get the values instead of referencing the DOM nodes directly
        var column = this.refs.column.getDOMNode().value;
        var query = this.refs.query.getDOMNode().value;

        this.setState({
            column: column,
            query: query
        });

        (this.props.onChange || noop)(
            {
                column: column,
                data: this.filterData(),
                query: query
            }
        );
    },

    componentDidMount() {
        this.change();
    },

    filterData() {
        var columns = this.props.columns;
        var data = this.props.data;

        var query = this.refs.query.getDOMNode().value;
        var column = this.refs.column.getDOMNode().value;

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

            var predicate = this.props.options.strategy(this.props.options.transform(query));

            return predicate.matches(this.props.options.transform(formattedValue));
        }
    }
});

// TODO: Expose whether or not the highlighter is case-sensitive ?
// This is a case-insensitive highlighter which highlights any occurrence of a given value
module.exports.highlight = function(getQuery) {
    return function(value) {
        var lowerCaseValue = value.toLowerCase();
        var query = getQuery().toLowerCase();
        var startIndex = lowerCaseValue.indexOf(query);
        if (startIndex === -1) {
            return value;
        }

        var children = [];
        var splitString = lowerCaseValue.split(query);
        var currentPosition = 0;
        for (var x = 0; x < splitString.length; x++) {
            var nonMatchedFromOriginal = value.slice(currentPosition, currentPosition + splitString[x].length);
            children.push(React.createElement('span', null, nonMatchedFromOriginal));
            currentPosition = currentPosition + nonMatchedFromOriginal.length;

            var matchedFromOriginal = value.slice(currentPosition, currentPosition + query.length);
            children.push(React.createElement('span', {className: 'highlight'}, matchedFromOriginal));
            currentPosition = currentPosition + matchedFromOriginal.length;
        }
        children.pop();
        var element = React.createElement('span', {className: 'search-result'}, children);
        return element;
    };
};

function id(a) {
    return a;
}

function noop() {}
