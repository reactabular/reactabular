'use strict';

var _ = require('lodash');

var merge = _.merge;
var reduce = _.reduce;
var isFunction = _.isFunction;
var isPlainObject = _.isPlainObject;
var isUndefined = _.isUndefined;

var React = require('react');
var update = require('react/lib/update');
var Header = require('./header');

module.exports = React.createClass({
    displayName: 'Table',

    propTypes: {
        header: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.func
        ]),
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
        row: React.PropTypes.func,
        children: React.PropTypes.object,
        rowKey: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            header: {},
            data: [],
            columns: []
        };
    },

    render() {
        var header = this.props.header;
        var data = this.props.data;
        var columns = this.props.columns;
        var rowKey = this.props.rowKey;
        var rowProps = this.props.row || noop;

        var props = update(this.props, {
            $merge: {
                header: undefined,
                data: undefined,
                columns: undefined
            }
        });

        return (
            <table {...props}>
                {isFunction(header) ? header(columns) : <thead><Header config={header} columns={columns} /></thead>}
                <tbody>
                    {data.map((row, i) => <tr key={(row[rowKey] || i) + '-row'} {...rowProps(row, i)}>{
                        columns.map((column, j) => {
                            var property = column.property;
                            var value = row[property];
                            var cell = column.cell || [id];
                            var content;

                            cell = isFunction(cell) ? [cell] : cell;

                            content = reduce([value].concat(cell), (v, fn) => {
                                if(v && React.isValidElement(v.value)) {
                                    return v;
                                }

                                if(!isPlainObject(value) && isPlainObject(v)) {
                                    return merge(v, {
                                        value: fn(v.value, data, i, property)
                                    });
                                }

                                var val = fn(v, data, i, property);

                                if(val && !isUndefined(val.value)) {
                                    return val;
                                }

                                // formatter shortcut
                                return {
                                    value: val
                                };
                            });

                            content = content || {};

                            return <td key={j + '-cell'} {...content.props}>{content.value}</td>;
                        }
                    )}</tr>)}
                </tbody>
                {this.props.children}
            </table>
        );
    }
});

function id(a) {
    return a;
}
function noop() {}
