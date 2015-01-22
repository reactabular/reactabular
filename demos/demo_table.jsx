'use strict';

var React = require('react');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var Paginator = require('../lib/paginator.jsx');
var editors = require('../lib/editors.jsx');
var sortColumn = require('../lib/sort_column');

var generateData = require('./generate_data');


var DemoTable = React.createClass({
    getInitialState() {
        var countries = [
            {
                value: 'de',
                name: 'Germany',
            },
            {
                value: 'fi',
                name: 'Finland',
            },
            {
                value: 'se',
                name: 'Sweden',
            },
        ];

        return {
            data: generateData({
                amount: 100,
                countries: countries.map((country) => country.value),
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
            ],
            pagination: {
                page: 0,
                perPage: 20
            }
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];

        var events = {
            // you could hook these with flux etc.
            selectedHeader: sortColumn(columns, data, this.setState.bind(this)),
            edited: ((i, property, value) => {
                data[i][property] = value;

                this.setState({
                    data: data
                });
            }).bind(this)
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
            <Table columns={columns} events={events} data={paginated.data}>
                <tfoot>
                    <tr>
                        <td>
                            <Paginator page={paginated.page} pages={paginated.amount} onSelect={this.onSelect}></Paginator>
                        </td>
                    </tr>
                </tfoot>
            </Table>
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

function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value? a: b[key] === value && b);
}

module.exports = DemoTable;
