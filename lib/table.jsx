'use strict';
var merge = require('lodash/object/merge');
var transform = require('lodash/object/transform');
var reduce = require('lodash/collection/reduce');
var isFunction = require('lodash/lang/isFunction');
var isPlainObject = require('lodash/lang/isPlainObject');
var isUndefined = require('lodash/lang/isUndefined');

var React = require('react/addons');
var cx = require('classnames');
var formatters = require('./formatters');
var update = React.addons.update;


module.exports = React.createClass({
    displayName: 'Table',

    propTypes: {
        header: React.PropTypes.object,
        data: React.PropTypes.array,
        columns: React.PropTypes.array
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
                                result[k] = k.indexOf('on') === 0? v.bind(null, column): v;
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
                    {data.map((row, i) => <tr key={i + '-row'}>{
                        columns.map((column, j) => {
                            var property = column.property;
                            var value = row[property];
                            var cell = column.cell || [formatters.identity];
                            var content;

                            cell = isFunction(cell)? [cell]: cell;

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
