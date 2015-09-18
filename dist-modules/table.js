'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require('lodash');

var merge = _.merge;
var reduce = _.reduce;
var isFunction = _.isFunction;
var isPlainObject = _.isPlainObject;
var isUndefined = _.isUndefined;

var React = require('react/addons');
var cx = require('classnames');
var update = React.addons.update;

module.exports = React.createClass({
    displayName: 'Table',

    propTypes: {
        header: React.PropTypes.object,
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
        row: React.PropTypes.func,
        children: React.PropTypes.object,
        rowKey: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            header: {},
            data: [],
            columns: []
        };
    },

    render: function render() {
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

        return React.createElement(
            'table',
            props,
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    columns.map(function (column, i) {
                        var columnHeader = reduce(header, function (result, v, k) {
                            result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;

                            return result;
                        }, {});

                        return React.createElement(
                            'th',
                            _extends({
                                key: i + '-header',
                                className: cx(column.classes)
                            }, columnHeader),
                            column.header
                        );
                    })
                )
            ),
            React.createElement(
                'tbody',
                null,
                data.map(function (row, i) {
                    return React.createElement(
                        'tr',
                        _extends({ key: (row[rowKey] || i) + '-row' }, rowProps(row, i)),
                        columns.map(function (column, j) {
                            var property = column.property;
                            var value = row[property];
                            var cell = column.cell || [id];
                            var content;

                            cell = isFunction(cell) ? [cell] : cell;

                            content = reduce([value].concat(cell), function (v, fn) {
                                if (v && React.isValidElement(v.value)) {
                                    return v;
                                }

                                if (!isPlainObject(value) && isPlainObject(v)) {
                                    return merge(v, {
                                        value: fn(v.value, data, i, property)
                                    });
                                }

                                var val = fn(v, data, i, property);

                                if (val && !isUndefined(val.value)) {
                                    return val;
                                }

                                return {
                                    value: val
                                };
                            });

                            content = content || {};

                            return React.createElement(
                                'td',
                                _extends({ key: j + '-cell' }, content.props),
                                content.value
                            );
                        })
                    );
                })
            ),
            this.props.children
        );
    }
});

function id(a) {
    return a;
}
function noop() {}
// formatter shortcut