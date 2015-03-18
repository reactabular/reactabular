'use strict';

var _ = require('lodash');

var React = require('react/addons');
var cells = require('./cells');
var cx = React.addons.classSet;
var formatters = require('./formatters');
var update = React.addons.update;


module.exports = React.createClass({
    propTypes: {
        header: React.PropTypes.object,
        data: React.PropTypes.array,
        columns: React.PropTypes.array,
    },

    getDefaultProps() {
      return {
        header: {},
        data: [],
        columns: [],
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
                columns: undefined,
            },
        });

        return (
            <table {...props}>
                <thead>
                    <tr>
                        {columns.map((column, i) => {
                            var columnHeader = _.transform(header, (result, v, k) => {
                                result[k] = k.indexOf('on') === 0? v.bind(null, column): v;
                            });

                            return <th
                                key={i + '-header'}
                                className={cx(column.classes)}
                                {...columnHeader}
                            >
                                {column.header}
                            </th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <tr key={i + '-row'}>{
                        columns.map((column, j) => {
                            var value = row[column.property];
                            var formatter = column.formatter || formatters.identity;
                            var formattedValue = formatter(value);

                            var cell = column.cell || cells.identity;
                            var props = cell({
                                original: value,
                                formatted: formattedValue,
                            }, data, i, column.property);
                            var content = props.value;

                            props = update(props, {
                                $merge: {
                                    value: undefined,
                                },
                            });

                            return <td key={j + '-cell'} {...props}>{content}</td>
                        }
                    )}</tr>)}
                </tbody>
                {this.props.children}
            </table>
        );
    },
});
