'use strict';

var React = require('react/addons');

var Cell = require('./cell.jsx');


module.exports = React.createClass({
    render() {
        var events = this.props.events || {
            selectedHeader: noop,
            cell: {
                isEdited: noop,
                onClick: noop,
                onValue: noop,
            }
        };
        var data = this.props.data || [];
        var columns = this.props.columns || [];

        var cx = React.addons.classSet;

        // don't pass these props to table. maybe there's a cleaner way...
        delete this.props.events;
        delete this.props.data;
        delete this.props.columns;

        return (
            <table {...this.props}>
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
                            <Cell
                                key={j + '-cell'}
                                formatter={(value) =>
                                    column.formatter? column.formatter(value, i): value
                                }
                                value={row[column.property]}
                                editor={column.editor}
                                isEdited={() =>
                                    events.cell.isEdited(
                                        i,
                                        column.property
                                    )
                                }
                                onClick={() =>
                                    events.cell.onClick(
                                        i,
                                        column.property
                                    )
                                }
                                onValue={(value) =>
                                    events.cell.onValue(
                                        i,
                                        column.property,
                                        value
                                    )
                                }>
                            </Cell>
                    )}</tr>)}
                </tbody>
                {this.props.children}
            </table>
        );
    },
});

function noop() {}
