'use strict';

var React = require('react');
var Form = require('plexus-form');
var validate = require('plexus-validate');
var SkyLight = require('react-skylight');
var generators = require('annogenerate');
var math = require('annomath');
var Paginator = require('react-pagify');
var titleCase = require('title-case');
var zip = require('annozip');

var Table = require('../lib/table.jsx');
var Search = require('../lib/search.jsx');
var editors = require('../lib/editors');
var sortColumn = require('../lib/sort_column');
var cells = require('../lib/cells');

var countries = require('./countries');
var generateData = require('./generate_data');


module.exports = React.createClass({
    getInitialState() {
        var countryValues = countries.map((c) => c.value);
        var properties = generateTitles({
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
                enum: countryValues,
                enumNames: countries.map((c) => c.name),
            },
            active: {
                type: 'boolean'
            }
        });
        var data = generateData({
            amount: 100,
            fieldGenerators: getFieldGenerators(countryValues),
            properties: properties,
        });
        var createEditCell = cells.edit.bind(this, 'editedCell');

        return {
            editedCell: null,
            data: data,
            searchData: data,
            header: {
                onClick: (column) => {
                    // reset edits
                    this.setState({
                        editedCells: []
                    });

                    sortColumn(
                        this.state.columns,
                        column,
                        this.state.searchData,
                        this.setState.bind(this)
                    );
                },
            },
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                    cell: createEditCell({
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
                    cell: [createEditCell({
                        editor: editors.dropdown(countries),
                    }), (country) => find(countries, 'value', country).name],
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    cell: (salary) => parseFloat(salary).toFixed(2),
                },
                /*{
                    property: 'active',
                    header: 'Active',
                    cell: [
                        createEditCell({
                            editor: editors.boolean(),
                        }),
                        (active) => active && <span>&#10003;</span>
                    ],
                },*/
                {
                    cell: function(value, data, rowIndex, property) {
                        var edit = () => {
                            var schema = {
                                type: 'object',
                                properties: properties,
                            };

                            var onSubmit = (data, value, errors) => {
                                this.refs.modal.hide();

                                if(value === 'Cancel') {
                                    return;
                                }

                                this.state.data[rowIndex] = data;

                                this.setState({
                                    data: this.state.data
                                });
                            };

                            this.setState({
                                modal: {
                                    title: 'Edit',
                                    content: <Form
                                        buttons={['OK', 'Cancel']}
                                        schema={schema}
                                        validate={validate}
                                        values={this.state.data[rowIndex]}
                                        onSubmit={onSubmit}
                                    ></Form>
                                }
                            });

                            this.refs.modal.show();
                        };

                        var remove = () => {
                            // this could go through flux etc.
                            this.state.data.splice(rowIndex, 1);

                            this.setState({
                                data: this.state.data
                            });
                        };

                        return {
                            value: <span>
                                <span className='edit' onClick={edit.bind(this)} style={{cursor: 'pointer'}}>
                                    &#8665;
                                </span>
                                <span className='remove' onClick={remove.bind(this)} style={{cursor: 'pointer'}}>
                                    &#10007;
                                </span>
                            </span>
                        };
                    }.bind(this),
                },
            ],
            modal: {
                title: 'title',
                content: 'content',
            },
            pagination: {
                page: 0,
                perPage: 10
            },
            editedCells: [], // i -> property index to keep track of edit state
        };
    },

    render() {
        var header = this.state.header;
        var columns = this.state.columns;
        var data = this.state.data;
        var searchData = this.state.searchData;

        var pagination = this.state.pagination;
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
            <Table className='pure-table pure-table-striped' header={header} columns={columns} data={paginated.data}>
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
            <SkyLight ref='modal' title={this.state.modal.title}>{this.state.modal.content}</SkyLight>
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

function generateTitles(o) {
    return zip.toObject(zip(o).map((pair) => {
        pair[1].title = titleCase(pair[0]);

        return pair;
    }));
}

function getFieldGenerators(countryValues) {
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
            return math.pick(countryValues);
        }
    };
}

function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value? a: b[key] === value && b);
}
