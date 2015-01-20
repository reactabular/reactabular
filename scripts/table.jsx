'use strict';

var React = require('react/addons');

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
        var cx = React.addons.classSet;

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map((column, i) =>
                            <th
                                key={i + '-header'}
                                className={cx(column.classes)}
                                onClick={events.selectedHeader.bind(null, column)}
                            >
                                {column.header}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.filter((row) =>
                        !('_visible' in row) || row._visible
                    ).map((row, i) => <tr key={i + '-row'}>{
                        columns.map((column, j) =>
                            column.cell? <td key={j + '-cell'}>{column.cell(i)}</td>:
                            <Cell
                                editable={column.editable}
                                key={j + '-cell'}
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
