'use strict';
var _ = require('lodash');

var merge = _.merge;
var transform = _.transform;
var reduce = _.reduce;
var isFunction = _.isFunction;
var isPlainObject = _.isPlainObject;
var isUndefined = _.isUndefined;

var React = require('react/addons');
var cx = require('classnames');
var formatters = require('./formatters');
var update = React.addons.update;


module.exports = React.createClass({
    displayName: 'Table',

    propTypes: {
        header: React.PropTypes.object,
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
        row: React.PropTypes.func,
        children: React.PropTypes.object,
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
                <thead>
                    <tr>
                        {columns.map((column, i) => {
                            var columnHeader = transform(header, (result, v, k) => {
                                result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;
                            });

                            return (
                                <th
                                    key={i + '-header'}
                                    className={cx(column.classes)}
                                    {...columnHeader}
                                >{column.header}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <tr key={i + '-row'} {...rowProps(row, i)}>{
                        columns.map((column, j) => {
                            var property = column.property;
                            var value = row[property];
                            var cell = column.cell || [formatters.identity];
                            var content;

                            cell = isFunction(cell) ? [cell] : cell;

                            content = reduce([value].concat(cell), (v, fn) => {
                                if(v && React.isValidElement(v.value)) {
                                    return v;
                                }

                                if(isPlainObject(v)) {
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

function noop() {}
