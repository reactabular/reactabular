'use strict';

var React = require('react');
var Form = require('react-json-editor');
var validate = require('plexus-validate');
var SkyLight = require('react-skylight').default;
var generators = require('annogenerate');
var Paginator = require('react-pagify').default;
var titleCase = require('title-case');
var findIndex = require('lodash/findIndex');
var orderBy = require('lodash/orderBy');
var sample = require('lodash/sample');
var cx = require('classnames');
var segmentize = require('segmentize');

var Table = require('../src/table');
var ColumnNames = require('../src/column_names');
var Search = require('../src/search');
var editors = require('../src/editors');
var sortColumn = require('../src/sort_column');
var cells = require('../src/cells');

var FieldWrapper = require('./field_wrapper.jsx');
var SectionWrapper = require('./section_wrapper.jsx');
var countries = require('./countries');
var generateData = require('./generate_data');

var highlight = require('../src/formatters/highlight');

module.exports = React.createClass({
    displayName: 'FullTable',
    getInitialState() {
        var countryValues = countries.map((c) => c.value);
        var properties = augmentWithTitles({
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
            },
        });
        var data = generateData({
            amount: 100,
            fieldGenerators: getFieldGenerators(countryValues),
            properties: properties,
        });
        data = attachIds(data);
        var editable = cells.edit.bind(this, 'editedCell', (value, celldata, rowIndex, property) => {
            var idx = findIndex(this.state.data, {
                id: celldata[rowIndex].id,
            });

            this.state.data[idx][property] = value;

            this.setState({
                data: data,
            });
        });
        var formatters = {
            country: (country) => find(countries, 'value', country).name,
            //salary: (salary) => parseFloat(salary).toFixed(2),
        };

        var highlighter = (column) => highlight((value) => {
            var { filter } = this.state.search;
            return Search.matches(column, value, filter[Object.keys(filter).pop()]);
        });

        return {
            editedCell: null,
            data: data,
            formatters: formatters,
            search: {
                filter: {}
            },
            header: {
                onClick: (column) => {
                    // reset edits
                    this.setState({
                        editedCell: null
                    });

                    sortColumn(
                        this.state.columns,
                        column,
                        this.setState.bind(this)
                    );
                },
                className: cx(['header'])
            },
            sortingColumn: null, // reference to sorting column
            columns: [
                {
                    property: 'name',
                    header: <div>
                        <input
                            type="checkbox"
                            onClick={() => console.log('clicked')}
                            style={{width:'20px'}}/>Name
                        </div>,
                    cell: [editable({
                        editor: editors.input(),
                    }), highlighter('name')],
                },
                {
                    property: 'position',
                    header: 'Position',
                    cell: [editable({
                        editor: editors.input(),
                    }), highlighter('position')]
                },
                {
                    property: 'country',
                    header: 'Country',
                    search: formatters.country,
                    cell: [editable({
                        editor: editors.dropdown(countries),
                    }), formatters.country, highlighter('country')]
                },
                {
                    property: 'salary',
                    header: 'Salary',
                    cell: [(v) => ({
                        value: v,
                        props: {
                            onDoubleClick: () => alert('salary is ' + v)
                        }
                    }), highlighter('salary')]
                },
                {
                    property: 'active',
                    header: 'Active',
                    cell: [
                        editable({
                            editor: editors.boolean(),
                        }),
                        (active) => active && <span>&#10003;</span>
                    ],
                },
                {
                    cell: function(value, celldata, rowIndex) {
                        var idx = findIndex(this.state.data, {
                            id: celldata[rowIndex].id,
                        });

                        var edit = () => {
                            var schema = {
                                type: 'object',
                                properties: properties,
                            };

                            var onSubmit = (editData, editValue) => {
                                this.refs.modal.hide();

                                if(editValue === 'Cancel') {
                                    return;
                                }

                                this.state.data[idx] = editData;

                                this.setState({
                                    data: this.state.data
                                });
                            };

                            var getButtons = (submit) => {
                                return (
                                    <span>
                                        <input type='submit'
                                            className='pure-button pure-button-primary ok-button'
                                            key='ok' value='OK'
                                            onClick={submit} />
                                        <input type='submit'
                                            className='pure-button cancel-button'
                                            key='cancel' value='Cancel'
                                            onClick={submit} />
                                    </span>
                                );
                            };

                            this.setState({
                                modal: {
                                    title: 'Edit',
                                    content: <Form
                                        className='pure-form pure-form-aligned'
                                        fieldWrapper={FieldWrapper}
                                        sectionWrapper={SectionWrapper}
                                        buttons={getButtons}
                                        schema={schema}
                                        validate={validate}
                                        values={this.state.data[idx]}
                                        onSubmit={onSubmit}/>
                                }
                            });

                            this.refs.modal.show();
                        };

                        var remove = () => {
                            // this could go through flux etc.
                            this.state.data.splice(idx, 1);

                            this.setState({
                                data: this.state.data
                            });
                        };

                        return {
                            value: (
                                <span>
                                    <span className='edit' onClick={edit.bind(this)} style={{cursor: 'pointer'}}>
                                        &#8665;
                                    </span>
                                    <span className='remove' onClick={remove.bind(this)} style={{cursor: 'pointer'}}>
                                        &#10007;
                                    </span>
                                </span>
                            )
                        };
                    }.bind(this),
                },
            ],
            modal: {
                title: 'title',
                content: 'content',
            },
            pagination: {
                page: 1,
                perPage: 10
            }
        };
    },

    onSearch(filter) {
        this.setState({
            editedCell: null, // reset edits
            search: { filter }
        });
    },

    columnFilters() {
        var headerConfig = this.state.header;
        var columns = this.state.columns;
        // if you don't want an header, just return;
        return (
            <thead>
                <ColumnNames config={headerConfig} columns={columns} />
            </thead>
        );
    },

    render() {
        var columns = this.state.columns;

        var pagination = this.state.pagination;

        var data = this.state.data;

        if (this.state.search.filter) {
            data = Search.search(
                data,
                columns,
                this.state.search.filter
            );
        }


        data = sortColumn.sort(data, this.state.sortingColumn, orderBy);

        var paginated = paginate(data, pagination);
        var pages = Math.ceil(data.length / Math.max(
          isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
        );

        return (
            <div>
                <div className='controls'>
                    <div className='per-page-container'>
                        Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
                    </div>
                    <div className='search-container'>
                        Search <Search columns={columns} data={this.state.data} onChange={this.onSearch} />
                    </div>
                </div>
                <Table
                    className='pure-table pure-table-striped'
                    columnNames={this.columnFilters}
                    columns={columns}
                    data={paginated.data}
                    row={(d, rowIndex) => {
                        return {
                            className: rowIndex % 2 ? 'odd-row' : 'even-row',
                            onClick: () => console.log('clicked row', d)
                        };
                    }}
                >
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
                        <Paginator.Context className="pagify-pagination"
                        segments={segmentize({
                            page: pagination.page,
                            pages: pages,
                            beginPages: 3,
                            endPages: 3,
                            sidePages: 2
                        })} onSelect={this.onSelect}>
                            <Paginator.Button page={pagination.page - 1}>Previous</Paginator.Button>

                            <Paginator.Segment field="beginPages" />

                            <Paginator.Ellipsis className="ellipsis"
                              previousField="beginPages" nextField="previousPages" />

                            <Paginator.Segment field="previousPages" />
                            <Paginator.Segment field="centerPage" className="selected" />
                            <Paginator.Segment field="nextPages" />

                            <Paginator.Ellipsis className="ellipsis"
                              previousField="nextPages" nextField="endPages" />

                            <Paginator.Segment field="endPages" />

                            <Paginator.Button page={pagination.page + 1}>Next</Paginator.Button>
                        </Paginator.Context>
                    </div>
                </div>
                <SkyLight ref='modal' title={this.state.modal.title}>{this.state.modal.content}</SkyLight>
            </div>
        );
    },

    onSelect(page) {
        var pagination = this.state.pagination || {};
        var pages = Math.ceil(this.state.data.length / pagination.perPage);

        pagination.page = Math.min(Math.max(page, 1), pages);

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

function paginate(data, o) {
    data = data || [];

    // adapt to zero indexed logic
    var page = o.page - 1 || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

function augmentWithTitles(o) {
    for (var property in o) {
        o[property].title = titleCase(property);
    }

    return o;
}

function getFieldGenerators(countryValues) {
    return {
        name: function() {
            var forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
            'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
            var surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

            return sample(forenames) + ' ' + sample(surnames);
        },
        position: function() {
            var positions = ['Boss', 'Contractor', 'Client', ''];

            return sample(positions);
        },
        salary: generators.number.bind(null, 0, 2),
        country: function() {
            return sample(countryValues);
        }
    };
}

function attachIds(arr) {
    return arr.map((o, i) => {
        o.id = i;

        return o;
    });
}

function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value ? a : b[key] === value && b);
}
