import React from 'react';
import Form from 'react-json-editor';
import validate from 'plexus-validate';
import SkyLight from 'react-skylight';
import Paginator from 'react-pagify';
import cx from 'classnames';
import segmentize from 'segmentize';

import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';

import Table from '../src/table';
import ColumnNames from '../src/column_names';
import Search from '../src/search';
import editors from '../src/editors';
import sortColumn from '../src/sort_column';
import cells from '../src/cells';

import ColumnFilters from './column_filters';
import FieldWrapper from './field_wrapper';
import SectionWrapper from './section_wrapper';
import countries from './countries';
import generateData from './generate_data';

import highlight from '../src/formatters/highlight';
import {
    paginate, augmentWithTitles, getFieldGenerators, attachIds, find
} from './common';

export default React.createClass({
    displayName: 'FullTableWithMultipleFilters',
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
            return Search.matches(column, value, this.state.search.filter[column]);
        });

        return {
            editedCell: null,
            data: data,
            formatters: formatters,
            search: {
                filter: {},
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
                    filterPlaceholder: 'lol',
                    noFilter: true
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
                <ColumnFilters columns={columns} onChange={this.onSearch} />
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
