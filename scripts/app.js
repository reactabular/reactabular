'use strict';

var React = require('react');
var zip = require('annozip');

var Table = require('./table.jsx');


var App = React.createClass({
    getInitialState() {
        var that = this;
        var countries = {
            'de': 'Germany',
            'fi': 'Finland',
            'se': 'Sweden'
        };

        return {
            data: [
                {
                    name: 'Jack Jackson',
                    position: 'Boss',
                    salary: 10000,
                    country: 'se',
                    active: true,
                },
                {
                    name: 'Bo Bobson',
                    position: 'Contractor',
                    salary: 4650.9234,
                    country: 'de',
                    active: false,
                },
                {
                    name: 'Cecilia Robertson',
                    position: 'Client',
                    salary: 6499.1038,
                    country: 'fi',
                    active: true,
                }
            ],
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
                    editor: (active, done) => {
                        var handleChange = (e) =>
                            done(e.target.value);

                        return <select onChange={handleChange} value={active}>
                            {zip(countries).map((pair, i) =>
                                <option
                                    key={i}
                                    value={pair[0]}
                                >{pair[1]}</option>
                            )}
                        </select>
                    },
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
                    editor: (active, done) =>
                        <span>
                            <button
                                disabled={active}
                                onClick={done.bind(null, true)}
                            >&#10003;
                            </button>
                            <button
                                disabled={!active}
                                onClick={done.bind(null, false)}
                            >&#10007;
                            </button>
                        </span>
                    ,
                    formatter: (active) => active && <span>&#10003;</span>,
                },
                {
                    cell: (i) => {
                        var remove = () => {
                            // this could go through flux etc.
                            delete data[i];

                            that.setState({
                                data: data
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
        var that = this;
        var columns = this.state.columns;
        var data = this.state.data;

        var config = {
            columns: columns,
            events: {
                // you could hook these with flux etc.
                selectedHeader: (column) => {
                    var property = column.property;

                    columns.map((column) => {
                        column.classes = {};

                        return column;
                    });

                    column.sort = column.sort? -column.sort: 1;
                    column.classes = {
                        'sort-asc': column.sort === 1,
                        'sort-desc': column.sort === -1
                    };

                    data.sort((a, b) => {
                        if(a[property].localeCompare) {
                            return a[property].localeCompare(b[property]) * column.sort;
                        }

                        return a[property] - b[property] * column.sort;
                    });

                    that.setState({
                        columns: columns,
                        data: data
                    });
                },
                edited: (i, property, value) => {
                    data[i][property] = value;

                    that.setState({
                        data: data
                    });
                }
            }
        };

        return <Table config={config} data={data}></Table>;
    }
});

module.exports = App;
