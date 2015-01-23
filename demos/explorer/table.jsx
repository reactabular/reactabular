'use strict';

var React = require('react');

var Table = require('../../lib/table.jsx');

var generateData = require('../generate_data');


module.exports = React.createClass({
    getInitialState() {
        var columns = [
            {
                property: 'name',
                header: 'Name',
            },
            {
                property: 'position',
                header: 'Position',
            },
        ];

        return {
            data: generateData({
                properties: getProperties(columns),
                amount: 5,
            }),
            columns: columns,
            text: JSON.stringify(columns, null, 4),
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];

        return <div className='pure-g'>
            <div className='pure-u-1-3'>
                <h3>Schema</h3>

                <textarea
                    className='columns'
                    rows="30"
                    cols="60"
                    onChange={this.onChangeColumns}
                    value={this.state.text}></textarea>
            </div>
            <div className='pure-u-2-3'>
                <Table className='pure-table pure-table-striped' columns={columns} data={data}></Table>
            </div>
        </div>;
    },

    onChangeColumns(e) {
        var value = e.target.value;

        try {
            var columns = JSON.parse(value);

            this.setState({
                columns: columns,
                text: value,
                data: generateData({
                    properties: getProperties(columns),
                    amount: 5,
                })
            });
        }
        catch(e) {
            this.setState({
                text: value,
            });
        }
    },
});

function getProperties(columns) {
    var ret = {};

    columns.forEach((column) => {
        ret[column.property] = {
            type: 'string'
        };
    });

    return ret;
}
