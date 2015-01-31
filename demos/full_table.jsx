'use strict';

var React = require('react');
var generators = require('annogenerate');
var math = require('annomath');
var Paginator = require('react-pagify');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var editors = require('../lib/editors');
var sortColumn = require('../lib/sort_column');
var cell = require('../lib/cell');

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
        var data = generateData({
            amount: 100,
            fieldGenerators: getFieldGenerators(countries),
            properties: properties,
        });
        var createCell = cell.bind(this);

        return {
            data: data,
            searchData: data,
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                    cell: createCell({
                        editor: editors.input(),
                    }),
                },
                {
                    property: 'position',
                    header: 'Position',
                },
                {
                    property: 'country',
                    header: 'Country',
                    cell: createCell({
                        editor: editors.dropdown(countries),
                        formatter: (country) => find(countries, 'value', country).name,
                    }),
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    cell: createCell({
                        editor: editors.input(),
                        formatter: (salary) => parseFloat(salary).toFixed(2)
                    }),
                },
                {
                    property: 'active',
                    header: 'Active',
                    cell: createCell({
                        editor: editors.boolean(),
                        formatter: (active) => active && <span>&#10003;</span>,
                    }),
                },
                {
                    cell: (property, value, rowIndex, columnIndex) => {
                        var remove = () => {
                            // this could go through flux etc.
                            this.state.data.splice(rowIndex, 1);

                            this.setState({
                                data: this.state.data
                            });
                        };

                        return {
                            value: <span>
                                <span onClick={remove.bind(this)} style={{cursor: 'pointer'}}>&#10007;</span>
                            </span>
                        };
                    },
                },
            ],
            pagination: {
                page: 0,
                perPage: 10
            },
            editedCells: [], // i -> property index to keep track of edit state
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];
        var searchData = this.state.searchData || [];

        var events = {
            // you could hook into this with flux etc.
            selectedHeader: ((column) => {
                // reset edits
                this.setState({
                    editedCells: []
                });

                sortColumn(columns, column, searchData, this.setState.bind(this));
            }),
        };

        var pagination = this.state.pagination || {};
        var paginated = Paginator.paginate(searchData, pagination);

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
                    <Paginator
                        page={paginated.page}
                        pages={paginated.amount}
                        beginPages='3'
                        endPages='3'
                        onSelect={this.onSelect}></Paginator>
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

        pagination.perPage = parseInt(e.target.value, 10);

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
