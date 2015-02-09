'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;
var update = React.addons.update;
var zip = require('annozip');


module.exports = React.createClass({
    render() {
        var header = this.props.header || {};
        var data = this.props.data || [];
        var columns = this.props.columns || [];

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
                            var z = zip(header);
                            var columnHeader = z && zip.toObject(z.map((pair) => {
                                if(pair[0].indexOf('on') === 0) {
                                    return [pair[0], pair[1].bind(null, column)];
                                }

                                return pair;
                            }));

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
                            var cell = column.cell;

                            if(cell) {
                                var props = cell(column.property, value, i, j);
                                var content = props.value;

                                props = update(props, {
                                    $merge: {
                                        value: undefined,
                                    },
                                });

                                return <td key={j + '-cell'} {...props}>{content}</td>
                            }
                            else {
                                return <td key={j + '-cell'}>{value}</td>
                            }
                        }
                    )}</tr>)}
                </tbody>
                {this.props.children}
            </table>
        );
    },
});
