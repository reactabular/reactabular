'use strict';

var React = require('react');
var generators = require('annogenerate');
var math = require('annomath');

var properties2object = require('schema2object').properties2object;

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var editors = require('../lib/editors.jsx');
var sortColumn = require('../lib/sort_column');


var App = React.createClass({
    getInitialState() {
        var that = this;
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
                    cell: (i) => {
                        var remove = () => {
                            // this could go through flux etc.
                            delete that.state.data[i];

                            that.setState({
                                data: that.state.data
                            });
                        };

                        return <span>
                            <span onClick={remove} style={{cursor: 'pointer'}}>&#10007;</span>
                        </span>;
                    },
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

module.exports = App;

function generateData(o) {
    var properties = {
        name: {
            type: 'string'
        },
        position: {
            type: 'string'
        },
        salary: {
            type: 'number'
        },
        country: {
            type: 'string'
        },
        active: {
            type: 'boolean'
        }
    };
    var fieldGenerators = getFieldGenerators(o.countries);

    return math.range(o.amount).map(() =>
        properties2object({
            generators: generators,
            fieldGenerators: fieldGenerators,
            properties: properties
        })
    );
}

function getFieldGenerators(countries) {
    return {
        name: function() {
            var forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
            'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
            var surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

            return math.pick(forenames) + ' ' + math.pick(surnames);
        },
        position: function() {
            var positions = ['Boss', 'Contractor', 'Client'];

            return math.pick(positions);
        },
        salary: generators.number.bind(null, 0, 100000),
        country: function() {
            return math.pick(countries);
        }
    };
}
