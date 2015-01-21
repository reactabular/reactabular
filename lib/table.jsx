'use strict';

var React = require('react/addons');

var Cell = require('./cell.jsx');


var Table = React.createClass({
    render() {
        var events = this.props.events || {
            selectedHeader: noop,
            edited: noop
        };
        var data = this.props.data || [];
        var columns = this.props.columns || [];

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
                                key={j + '-cell'}
                                formatter={column.formatter}
                                value={row[column.property]}
                                editor={column.editor}
                                edited={(value) =>
                                    events.edited(
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

function noop() {}

module.exports = Table;
