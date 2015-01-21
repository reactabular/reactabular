'use strict';

var React = require('react');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var editors = require('../lib/editors.jsx');
var sortColumn = require('../lib/sort_column');

var generateData = require('./generate_data');


var DemoTable = React.createClass({
    getInitialState() {
        var countries = {
            'de': 'Germany',
            'fi': 'Finland',
            'se': 'Sweden'
        };

        return {
            data: generateData({
                amount: 20,
                countries: Object.keys(countries)
            }),
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                    editable: true,
                },
                {
                    property: 'position',
                    header: 'Position',
                },
                {
                    property: 'country',
                    header: 'Country',
                    formatter: (country) => countries[country],
                    editable: true,
                    editor: editors.dropdown(countries),
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    editable: true,
                    formatter: (salary) => parseFloat(salary).toFixed(2),
                },
                {
                    property: 'active',
                    header: 'Active',
                    editable: true,
                    editor: editors.boolean(),
                    formatter: (active) => active && <span>&#10003;</span>,
                },
                {
                    cell: ((i) => {
                        var remove = () => {
                            // this could go through flux etc.
                            this.state.data.splice(i, 1);

                            this.setState({
                                data: this.state.data
                            });
                        };

                        return <span>
                            <span onClick={remove.bind(this)} style={{cursor: 'pointer'}}>&#10007;</span>
                        </span>;
                    }).bind(this),
                }
            ]
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];

        var config = {
            columns: columns,
            events: {
                // you could hook these with flux etc.
                selectedHeader: sortColumn(columns, data, this.setState.bind(this)),
                edited: ((i, property, value) => {
                    data[i][property] = value;

                    this.setState({
                        data: data
                    });
                }).bind(this)
            }
        };

        return <div>
            <Search columns={columns} data={data} onResult={this.setState.bind(this)}></Search>
            <Table config={config} data={data}></Table>
        </div>;
    },
});

module.exports = DemoTable;
