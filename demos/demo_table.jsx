'use strict';

var React = require('react');
var math = require('annomath');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var editors = require('../lib/editors.jsx');
var sortColumn = require('../lib/sort_column');

var generateData = require('./generate_data');


var Paginator = React.createClass({
    render() {
        var onSelect = this.props.onSelect || noop;
        var page = this.props.page;
        var pages = this.props.pages;

        return <ul className='pagination'>{
            math.range(pages).map((i) =>
                <li
                    key={'pagination-' + i}
                    onClick={onSelect.bind(null, i)}
                    className={i === page && 'selected'}>
                    <a href='#' onClick={this.preventDefault}>
                        {i + 1}
                    </a>
                </li>
            )
        }</ul>;
    },

    preventDefault(e) {
        e.preventDefault();
    },
});

var DemoTable = React.createClass({
    getInitialState() {
        var countries = {
            'de': 'Germany',
            'fi': 'Finland',
            'se': 'Sweden'
        };

        return {
            data: generateData({
                amount: 100,
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

        var pagination = this.state.pagination || {};
        var paginated = paginate({
            data: data.filter((d) => !('_visible' in d) || d._visible),
            page: pagination.page,
            perPage: pagination.perPage,
        });

        return <div>
            <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
            <Paginator page={paginated.page} pages={paginated.amount} onSelect={this.onSelect}></Paginator>
            <Search columns={columns} data={data} onResult={this.setState.bind(this)}></Search>
            <Table config={config} data={paginated.data}></Table>
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

function paginate(o) {
    var data = o.data || [];
    var page = o.page || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

function noop() {}

module.exports = DemoTable;
