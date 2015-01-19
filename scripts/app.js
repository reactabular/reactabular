'use strict';

var React = require('react');

var Table = require('./table.jsx');


var App = React.createClass({
    render() {
        var config = {
            columns: [
                {
                    property: 'name',
                    editable: true,
                    header: 'Name',
                },
                {
                    property: 'position',
                    header: 'Position',
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    formatter: (salary) => salary.toFixed(2)
                }
            ]
        };
        var data = [
            {
                name: 'Jack Jackson',
                position: 'Boss',
                salary: 10000,
            },
            {
                name: 'Bo Bobson',
                position: 'Contractor',
                salary: 4650.9234,
            },
            {
                name: 'Cecilia Robertson',
                position: 'Client',
                salary: 6499.1038
            }
        ];

        return (
            <Table config={config} data={data}></Table>
        );
    }
});

module.exports = App;
