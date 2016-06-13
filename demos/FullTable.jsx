import React from 'react';

import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';

import {
  Table, Search, editors, sort, cells, formatters
} from '../src';

import {
  CustomFooter, Modal, Paginator, PerPage
} from './components';

import EditCell from './EditCell';
import countries from './countries';
import generateData from './generate_data';

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
    var highlighter = (column) => formatters.highlight((value) => {
      var { filter } = this.state.search;
      return Search.matches(column, value, filter[Object.keys(filter).pop()]);
    });
    const countryFormatter = (country) => find(countries, 'value', country).name;

    return {
      editedCell: null,
      data: data,
      formatters: {
        country: countryFormatter,
              //salary: (salary) => parseFloat(salary).toFixed(2),
      },
      search: {
        filter: {}
      },
      sortingColumn: null, // reference to sorting column
      columns: [
        {
          property: 'name',
          header: (
            <div>
              <input
                type="checkbox"
                onClick={() => console.log('clicked')}
                style={{width:'20px'}}/>Name
            </div>
          ),
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
          search: countryFormatter,
          cell: [editable({
            editor: editors.dropdown(countries),
          }), countryFormatter, highlighter('country')]
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

  render() {
    const {columns, modal, pagination, sortingColumn} = this.state;
    let data = this.state.data;

    if (this.state.search.filter) {
      data = Search.search(
          data,
          columns,
          this.state.search.filter
      );
    }

    data = sort.byColumn.sort(data, sortingColumn, orderBy);

    const paginated = paginate(data, pagination);
    const pages = Math.ceil(data.length / Math.max(
      isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
    );

    return (
      <div>
        <div className='controls'>
          <div className='per-page-container'>
            <PerPage value={pagination.perPage} onChange={this.onPerPage} />
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

          <CustomFooter />
        </Table.Context>

        <div className='controls'>
          <Paginator pagination={pagination} pages={pages} onSelect={this.onSelect} />
        </div>

        <Modal show={modal.show} title={modal.title} onCloseClicked={this.onModalClose}>
          {modal.content}
        </Modal>
      </div>
    );
  },
  onModalClose() {
    this.setState({
      modal: {
        ...this.state.modal,
        ...{
          show: false
        }
      }
    });
  },
  onSearch(filter) {
    this.setState({
      editedCell: null, // reset edits
      search: {filter}
    });
  },
  onHeaderClick: (column) => {
    // reset edits
    this.setState({
      editedCell: null
    });

    sort.byColumn(
      this.state.columns,
      column,
      this.setState.bind(this)
    );
  },
  onSelect(page) {
    var pages = Math.ceil(
      this.state.data.length / this.state.pagination.perPage
    );

    this.setState({pagination: {
      ...this.state.pagination,
      ...{
        page: Math.min(Math.max(page, 1), pages)
      }
    }});
  },
  onPerPage(value) {
    this.setState({pagination: {
      ...this.state.pagination,
      ...{
        perPage: parseInt(value, 10)
      }
    }});
  },
})
