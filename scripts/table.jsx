'use strict';

var React = require('react');


var Table = React.createClass({
    render() {
        var config = this.props.config || {};
        var data = this.props.data || [];

        if(!config.columns) {
            console.warn('missing column configuration');

            return null;
        }

        var columns = config.columns.map((column) => {
            column.formatter = column.formatter || id;

            return column;
        });

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map((column) =>
                            <th>{column.header}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => <tr>{
                        columns.map((column) =>
                            <td>{column.formatter(row[column.property])}</td>
                    )}</tr>)}
                </tbody>
            </table>
        );
    }
});

function id(a) {return a;}

module.exports = Table;