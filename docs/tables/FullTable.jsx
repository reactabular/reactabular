/* eslint-disable no-console, no-alert, no-shadow */
import React from 'react';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import range from 'lodash/range';
import keys from 'lodash/keys';
import values from 'lodash/values';
import transform from 'lodash/transform';
import jsf from 'json-schema-faker';

import {
  Table, search, editors, sort, transforms, formatters
} from '../../src';

import {
  CustomFooter, ColumnFilters, rowEditor,
  Paginator, PrimaryControls
} from '../helpers';
import countries from '../data/countries';

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid'
    },
    name: {
      type: 'string',
      faker: 'name.findName'
    },
    position: {
      type: 'string',
      faker: 'name.jobType'
    },
    salary: {
      $ref: '#/definitions/salary'
    },
    boss: {
      $ref: '#/definitions/boss'
    },
    country: {
      type: 'string',
      enum: keys(countries),
      enumNames: values(countries)
    },
    active: {
      type: 'boolean',
      faker: 'random.boolean'
    }
  },
  // Setting `active` required breaks react-jsonschema-form
  required: ['id', 'name', 'position', 'salary', 'boss', 'country'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          faker: 'name.findName'
        }
      },
      required: ['name']
    },
    salary: {
      type: 'integer',
      minimum: 0,
      maximum: 10000,
      exclusiveMinimum: true
    }
  }
};
// Attach active flags as faker won't initialize those by default
const data = range(100).map(() => jsf(schema)).map(o => ({ active: false, ...o }));

class FullTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedCell: null, // currently edited cell
      data, // initial data
      query: {}, // search query
      sortingColumns: null, // reference to the sorting columns
      columns: this.getColumns(), // initial columns
      pagination: { // initial pagination settings
        page: 1,
        perPage: 10
      }
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
    this.onConfirmEdit = this.onConfirmEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  getColumns() {
    const highlight = column => formatters.highlight(value => (
      search.matches({
        value,
        query: this.state.query[column] || this.state.query.all
      })
    ));
    const editable = transforms.edit({
      getEditId: ({ cellData, property }) => `${cellData.id}-${property}`,
      getEditProperty: () => this.state.editedCell,
      onActivate: idx => this.setState({ editedCell: idx }),
      onValue: ({ value, cellData, property }) => {
        const idx = findIndex(this.state.data, { id: cellData.id });

        this.state.data[idx][property] = value;

        this.setState({
          editedCell: null,
          data: this.state.data
        });
      }
    });
    const sortable = transforms.sort({
      getSortingColumns: () => this.state.sortingColumns || [],
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });
    const sortableHeader = sortHeader.bind(null, () => this.state.sortingColumns);

    return [
      {
        header: {
          label: 'Name',
          format: (name, extraParameters) => (
            <div style={{ display: 'inline' }}>
              <input
                type="checkbox"
                onClick={() => console.log('clicked')}
                style={{ width: '20px' }}
              />
              {sortableHeader(sortable('name'))(name, extraParameters)}
            </div>
          )
        },
        cell: {
          property: 'name',
          transforms: [editable(editors.input())],
          format: highlight('name')
        }
      },
      {
        header: {
          label: 'Position',
          format: sortableHeader(sortable('position'))
        },
        cell: {
          property: 'position'
        }
      },
      {
        header: {
          label: 'Boss',
          format: sortableHeader(sortable('boss.name'))
        },
        cell: {
          property: 'boss.name',
          format: highlight('boss.name')
        }
      },
      {
        header: {
          label: 'Country',
          format: sortableHeader(sortable('country'))
        },
        cell: {
          property: 'country',
          transforms: [editable(
            editors.dropdown({
              options: transform(countries, (result, name, value) => {
                result.push({ value, name });
              }, [])
            })
          )],
          format: highlight('country'),
          resolve: country => countries[country]
        }
      },
      {
        header: {
          label: 'Salary',
          format: sortableHeader(sortable('salary'))
        },
        cell: {
          property: 'salary',
          format: salary => (
            <span onDoubleClick={() => alert(`salary is ${salary}`)}>
              {highlight('salary')(salary)}
            </span>
          )
        }
      },
      {
        header: {
          label: 'Active',
          format: sortableHeader(sortable('active'))
        },
        cell: {
          property: 'active',
          transforms: [editable(editors.boolean())],
          format: active => active && <span>&#10003;</span>
        }
      },
      {
        cell: {
          // XXX: warning.js?8a56:44 Warning:
          // Failed propType: Invalid prop `id` of type `object` supplied
          // to `Wrapper`, expected `string`. Check the render method
          // of `SchemaField`.
          transforms: [
            rowEditor({
              schema,
              uiSchema: {
                id: { 'ui:widget': 'hidden' }
              },
              onConfirm: (id, data) => this.onConfirmEdit(id, data),
              onRemove: id => this.onRemove(id)
            })
          ]
        }
      }
    ];
  }
  render() {
    const {
      columns, data, pagination, sortingColumns, query
    } = this.state;
    let d = search.multipleColumns({ data, columns, query });

    d = sort.sorter({ data: d, sortingColumns, sort: orderBy });

    const paginated = paginate(d, pagination);
    const pages = Math.ceil(d.length / Math.max(
      isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
    );

    return (
      <div>
        <PrimaryControls
          className="controls"
          perPage={pagination.perPage}
          columns={columns}
          data={this.state.data}
          onPerPage={this.onPerPage}
          onSearch={this.onSearch}
        />

        <Table
          className="pure-table pure-table-striped"
          columns={columns}
          data={paginated.data}
          rowKey="id"
        >
          <Table.Header>
            <ColumnFilters columns={columns} onChange={this.onSearch} />
          </Table.Header>

          <Table.Body
            row={(row, rowIndex) => ({
              className: rowIndex % 2 ? 'odd-row' : 'even-row',
              onClick: () => console.log('clicked row', row)
            })}
          />

          <CustomFooter />
        </Table>

        <div className="controls">
          <Paginator pagination={pagination} pages={pages} onSelect={this.onSelect} />
        </div>
      </div>
    );
  }
  onSearch(query) {
    this.setState({
      editedCell: null, // reset edits
      query
    });
  }
  onSelect(page) {
    const pages = Math.ceil(
      this.state.data.length / this.state.pagination.perPage
    );

    this.setState({
      pagination: {
        ...this.state.pagination,
        page: Math.min(Math.max(page, 1), pages)
      }
    });
  }
  onPerPage(value) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        perPage: parseInt(value, 10)
      }
    });
  }
  onConfirmEdit(id, data) {
    const idx = findIndex(this.state.data, { id });

    this.state.data[idx] = data;

    this.setState({
      data: this.state.data
    });
  }
  onRemove(id) {
    const idx = findIndex(this.state.data, { id });

    // this could go through flux etc.
    this.state.data.splice(idx, 1);

    this.setState({
      data: this.state.data
    });
  }
}

function sortHeader(getSortingColumns, sortable) {
  return (value, { column }) => {
    const property = column.cell && column.cell.property;
    const sortingColumns = getSortingColumns();
    const idx = findIndex(sortingColumns, { property });

    return (
      <div style={{ display: 'inline' }}>
        <span className="value">{value}</span>
        {idx >= 0 &&
          <span className="sort-order" style={{ marginLeft: '0.5em' }}>
            {idx + 1}
          </span>
        }
        {sortable.toFormatter()}
      </div>
    );
  };
}

function paginate(data = [], o) {
    // adapt to zero indexed logic
  const page = o.page - 1 || 0;
  const perPage = o.perPage;

  const amountOfPages = Math.ceil(data.length / perPage);
  const startPage = page < amountOfPages ? page : 0;

  return {
    amount: amountOfPages,
    data: data.slice(startPage * perPage, startPage * perPage + perPage),
    page: startPage
  };
}

export default FullTable;
