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
                            if (isFunction(column.cell)) {
                              // Always replace value with the result of cell()
                              value = column.cell(value, data, i, property);
                            }

                            var content = {value: value};

                            if (isPlainObject(value)) {
                              // If a plain object was returned, we pass along its keys/values
                              // to the table cell (e.g. props, value, className, etc.)
                              content = merge(content, value);
                            }

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
