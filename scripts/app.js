'use strict';

var React = require('react');

var Table = require('./table.jsx');


var App = React.createClass({
    render() {
        var countries = {
            'de': 'Germany',
            'fi': 'Finland',
            'se': 'Sweden'
        };
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
                    property: 'country',
                    header: 'Country',
                    formatter: (country) => countries[country]
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    formatter: (salary) => salary.toFixed(2)
                },
            ]
        };
        var data = [
            {
                name: 'Jack Jackson',
                position: 'Boss',
                salary: 10000,
                country: 'se',
            },
            {
                name: 'Bo Bobson',
                position: 'Contractor',
                salary: 4650.9234,
                country: 'de',
            },
            {
                name: 'Cecilia Robertson',
                position: 'Client',
                salary: 6499.1038,
                country: 'fi',
            }
        ];

        return (
            <Table config={config} data={data}></Table>
        );
    }
});

module.exports = App;
