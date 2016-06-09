'use strict';

var reduce = require('lodash/reduce');
var isFunction = require('lodash/isFunction');
var isPlainObject = require('lodash/isPlainObject');
var isUndefined = require('lodash/isUndefined');

var React = require('react');
var ColumnNames = require('./column_names');

module.exports = React.createClass({
    displayName: 'Table',

    propTypes: {
        columnNames: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func
        ]),
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
        row: React.PropTypes.func,
        children: React.PropTypes.object,
        rowKey: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            columnNames: {},
            data: [],
            columns: [],
            row: () => {}
        };
    },

    render() {
        const {columnNames, data, columns, rowKey, row, ...props} = this.props;

        return (
            <table {...props}>
                {isFunction(columnNames) ? columnNames(columns) : <thead><ColumnNames config={columnNames} columns={columns} /></thead>}
                <tbody>
                    {data.map((r, i) => <tr key={(r[rowKey] || i) + '-row'} {...row(r, i)}>{
                        columns.map((column, j) => {
                            var property = column.property;
                            var value = r[property];
                            var cell = column.cell || [() => {}];
                            var content;

                            cell = isFunction(cell) ? [cell] : cell;

                            content = reduce(cell, (v, fn) => {
                                if(React.isValidElement(v.value)) {
                                    return v;
                                }

                                var val = fn(v.value, data, i, property);

                                if(!isPlainObject(val) || isUndefined(val.value)) {
                                    // formatter shortcut
                                    val = {value: val};
                                }

                                return {
                                    value: isUndefined(val.value) ? v.value : val.value,
                                    props: {...v.props, ...val.props}
                                };
                            }, {value: value, props: {}});

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
