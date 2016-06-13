import React from 'react';
import {SkyLightStateless} from 'react-skylight';
import Paginator from 'react-pagify';
import cx from 'classnames';
import segmentize from 'segmentize';

import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';

import {
    Table, Search, editors, sortColumn, cells
} from '../src';

import EditCell from './edit_cell';
import countries from './countries';
import generateData from './generate_data';

import highlight from '../src/formatters/highlight';
import {
    paginate, augmentWithTitles, getFieldGenerators, attachIds, find
} from './common';

export default React.createClass({
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
                type: 'string',
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
                        var edit = () => {
                            var idx = findIndex(this.state.data, {
                                id: celldata[rowIndex].id,
                            });

                            this.setState({
                                modal: {
                                    show: true,
                                    title: 'Edit',
                                    content: <EditCell
                                        onSubmit={(formData) => {
                                            this.state.modal.show = false;
                                            this.state.data[idx] = formData;

                                            this.setState({
                                                modal: this.state.modal,
                                                data: this.state.data
                                            });
                                        }}
                                        onCancel={() => {
                                            this.setState({
                                                modal: Object.assign(
                                                    {}, this.state.modal, {
                                                        show: false
                                                    }
                                                )
                                            });
                                        }}
                                        formData={this.state.data[idx]}
                                        properties={properties}
                                    />
                                }
                            });
                        }

                        var remove = () => {
                            var idx = findIndex(this.state.data, {
                                id: celldata[rowIndex].id,
                            });

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
                show: false,
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
                <Table.Context
                    className='pure-table pure-table-striped'
                    columns={columns}
                    data={paginated.data}>
                    <Table.Header
                        header={(header, headerIndex) => ({
                            onClick: this.onHeaderClick
                        })}/>

                    <Table.Body
                        rowKey='id'
                        row={(row, rowIndex) => ({
                            className: rowIndex % 2 ? 'odd-row' : 'even-row',
                            onClick: () => console.log('clicked row', row)
                        })}/>

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
                </Table.Context>

                <div className='controls'>
                    <Paginate pagination={pagination} pages={pages} onSelect={this.onSelect} />
                </div>
                <SkyLightStateless
                    isVisible={this.state.modal.show}
                    title={this.state.modal.title}
                    onCloseClicked={() => this.setState({
                        modal: Object.assign({}, this.state.modal, {
                            show: false
                        })
                    })}
                    >{this.state.modal.content}</SkyLightStateless>
            </div>
        );
    },

    onHeaderClick: (column) => {
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
})

// TODO: push more bits here
const Paginate = ({pagination, pages, onSelect}) => (
    <div className='pagination'>
        <Paginator.Context className="pagify-pagination"
        segments={segmentize({
            page: pagination.page,
            pages: pages,
            beginPages: 3,
            endPages: 3,
            sidePages: 2
        })} onSelect={onSelect}>
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
);
Paginate.propTypes = {
    pagination: React.PropTypes.object,
    pages: React.PropTypes.number,
    onSelect: React.PropTypes.func
};

