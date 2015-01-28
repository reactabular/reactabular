'use strict';

var React = require('react');
var generators = require('annogenerate');
var math = require('annomath');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var Paginator = require('../lib/paginator.jsx');
var editors = require('../lib/editors');
var sortColumn = require('../lib/sort_column');

var countries = require('./countries');
var generateData = require('./generate_data');


module.exports = React.createClass({
    getInitialState() {
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

        return {
            data: generateData({
                amount: 100,
                fieldGenerators: getFieldGenerators(countries),
                properties: properties,
            }),
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                    editor: editors.input(),
                },
                {
                    property: 'position',
                    header: 'Position',
                },
                {
                    property: 'country',
                    header: 'Country',
                    formatter: (country) => find(countries, 'value', country).name,
                    editor: editors.dropdown(countries),
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    editor: editors.input(),
                    formatter: (salary) => parseFloat(salary).toFixed(2),
                },
                {
                    property: 'active',
                    header: 'Active',
                    editor: editors.boolean(),
                    formatter: (active) => active && <span>&#10003;</span>,
                },
                {
                    formatter: ((_, i) => {
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
                },
            ],
            pagination: {
                page: 0,
                perPage: 10
            },
            editedCells: [] // i -> property index to keep track of edit state
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];

        var events = {
            // you could hook these with flux etc.
            selectedHeader: ((column) => {
                // reset edits
                this.setState({
                    editedCells: []
                });

                sortColumn(columns, column, data, this.setState.bind(this));
            }).bind(this),
            cell: {
                isEdited: (i, property) => {
                    var editedCells = this.state.editedCells;

                    if(!editedCells[i]) {
                        return;
                    }

                    return editedCells[i][property];
                },
                onClick: ((i, property) => {
                    var editedCells = this.state.editedCells;

                    if(!editedCells[i]) {
                        editedCells[i] = {};
                    }

                    editedCells[i][property] = true;

                    this.setState({
                        editedCells: editedCells,
                    })
                }).bind(this),
                onValue: ((i, property, value) => {
                    var editedCells = this.state.editedCells;

                    if(!editedCells[i]) {
                        return;
                    }

                    editedCells[i][property] = false;
                    data[i][property] = value;

                    this.setState({
                        data: data,
                        editedCells: editedCells,
                    });
                }).bind(this),
            },
        };

        var pagination = this.state.pagination || {};
        var paginated = Paginator.paginate(data, pagination);

        return <div>
            <div className='controls'>
                <div className='per-page-container'>
                    Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
                </div>
                <div className='search-container'>
                    Search <Search columns={columns} data={data} onResult={this.setState.bind(this)}></Search>
                </div>
            </div>
            <Table className='pure-table pure-table-striped' columns={columns} events={events} data={paginated.data}>
                <tfoot>
                    <tr>
                        <td>
                            You could show sums etc. here in the customizable footer.
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
            <div className='controls'>
                <div className='pagination'>
                    <Paginator page={paginated.page} pages={paginated.amount} onSelect={this.onSelect}></Paginator>
                </div>
            </div>
        </div>;
    },

    onSelect(page) {
        var pagination = this.state.pagination || {};

        pagination.page = page;

        this.setState({
            pagination: pagination
        });
    },

    onPerPage(e) {
        var pagination = this.state.pagination || {};

        pagination.perPage = parseInt(event.target.value, 10);

        this.setState({
            pagination: pagination
        });
    },
});

function getFieldGenerators(countries) {
    countries = countries.map((country) => country.value);

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

function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value? a: b[key] === value && b);
}
