'use strict';

var React = require('react');

var Cell = require('./cell.jsx');


var Table = React.createClass({
    render() {
        var config = this.props.config || {};
        var events = config.events || {};
        var data = this.props.data || [];

        if(!config.columns) {
            console.warn('missing column configuration');

            return null;
        }

        var columns = config.columns;

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map((column) =>
                            <th key={column.property + '-header'}>
                                {column.header}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <tr key={i + '-row'}>{
                        columns.map((column) =>
                            <Cell
                                editable={column.editable}
                                key={column.property + '-cell'}
                                formatter={column.formatter}
                                value={row[column.property]}
                                editor={column.editor}
                                edited={(value) =>
                                    events.edited && events.edited(
                                        i,
                                        column.property,
                                        value
                                    )
                                }>
                            </Cell>
                    )}</tr>)}
                </tbody>
            </table>
        );
    },
});

module.exports = Table;
