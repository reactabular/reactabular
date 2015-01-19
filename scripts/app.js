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
                    header: 'Name'
                },
                {
                    property: 'position',
                    header: 'Position'
                }
            ]
        };
        var data = [
            {
                name: 'Jack Jackson',
                position: 'Boss'
            },
            {
                name: 'Bo Bobson',
                position: 'Contractor'
            },
            {
                name: 'Cecilia Robertson',
                position: 'Client'
            }
        ];

        return (
            <Table config={config} data={data}></Table>
        );
    }
});

module.exports = App;
