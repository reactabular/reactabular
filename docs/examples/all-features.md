The following example uses majority of Reactabular's features and combines them into a single example.

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import keys from 'lodash/keys';
import values from 'lodash/values';
import transform from 'lodash/transform';
import {
  Table, search, editors, sort, transforms, formatters
} from 'reactabular';

import {
  ColumnFilters, Paginator, PrimaryControls,
  generateData, paginate, VisibilityToggles,
  resizableColumn
} from './helpers';
import countries from './data/countries';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    salary: {
      type: 'integer'
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
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'position', 'salary', 'boss', 'country', 'active'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};

class AllFeaturesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedCell: null, // currently edited cell
      data: generateData(100, schema), // initial data
      query: {}, // search query
      sortingColumns: null, // reference to the sorting columns
      columns: this.getColumns(), // initial columns
      pagination: { // initial pagination settings
        page: 1,
        perPage: 10
      }
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  getColumns() {
    const highlight = column => formatters.highlight(value => (
      search.matches({
        value,
        query: this.state.query[column] || this.state.query.all
      })
    ));
    const editable = transforms.edit({
      getEditId: ({ rowData, property }) => `${rowData.id}-${property}`,
      getEditProperty: () => this.state.editedCell,
      onActivate: idx => this.setState({ editedCell: idx }),
      onValue: ({ value, rowData, property }) => {
        const idx = findIndex(this.state.data, { id: rowData.id });

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
    const sortableHeader = sortHeader(sortable, () => this.state.sortingColumns);
    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.props.style = {
          ...column.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    return [
      {
        props: {
          style: {
            width: 200
          }
        },
        header: {
          label: 'Name',
          format: (name, extraParameters) => resizable(
            <div style={{ display: 'inline' }}>
              <input
                type="checkbox"
                onClick={() => console.log('clicked')}
                style={{ width: '20px' }}
              />
              {sortableHeader(name, extraParameters)}
            </div>,
            extraParameters
          )
        },
        cell: {
          property: 'name',
          transforms: [editable(editors.input())],
          format: highlight('name')
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Position',
          format: (v, extra) => resizable(sortableHeader(v, extra), extra)
        },
        cell: {
          property: 'position',
          transforms: [editable(editors.input())],
          format: highlight('position')
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Boss',
          format: sortableHeader
        },
        cell: {
          property: 'boss.name',
          transforms: [editable(editors.input())],
          format: highlight('boss.name')
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Country',
          format: sortableHeader
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
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Salary',
          format: sortableHeader
        },
        cell: {
          property: 'salary',
          transforms: [editable(editors.input({ props: { type: 'number' } }))],
          format: salary => (
            <span onDoubleClick={() => alert(`salary is ${salary}`)}>
              {highlight('salary')(salary)}
            </span>
          )
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 100
          }
        },
        header: {
          label: 'Active',
          format: sortableHeader
        },
        cell: {
          property: 'active',
          transforms: [editable(editors.boolean())],
          format: active => active && <span>&#10003;</span>
        },
        visible: true
      },
      {
        props: {
          style: {
            width: 50
          }
        },
        cell: {
          format: (value, { rowData }) => (
            <span
              className="remove"
              onClick={() => this.onRemove(rowData.id)} style={{ cursor: 'pointer' }}
            >
              &#10007;
            </span>
          )
        },
        visible: true
      }
    ];
  }
  render() {
    const {
      columns, data, pagination, sortingColumns, query
    } = this.state;
    const cols = columns.filter(column => column.visible);
    const paginated = compose(
      paginate(pagination),
      sort.sorter({ columns: cols, sortingColumns, sort: orderBy }),
      search.multipleColumns({ columns: cols, query })
    )(data);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <PrimaryControls
          className="controls"
          perPage={pagination.perPage}
          columns={cols}
          data={data}
          onPerPage={this.onPerPage}
          onSearch={this.onSearch}
        />

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={cols}
          data={paginated.data}
          rowKey="id"
        >
          <Table.Header>
            <ColumnFilters columns={cols} onChange={this.onSearch} />
          </Table.Header>

          <Table.Body
            row={(row, rowIndex) => ({
              className: rowIndex % 2 ? 'odd-row' : 'even-row',
              onClick: () => this.onRowSelected(row)
            })}
          />

          <tfoot>
            <tr>
              <td>
                You could show sums etc. here in the customizable footer.
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total salary: {
                paginated.data.reduce((a, b) => a + b.salary, 0)
              }</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </Table.Provider>

        <div className="controls">
          <Paginator
            pagination={pagination}
            pages={paginated.amount}
            onSelect={this.onSelect}
          />
        </div>
      </div>
    );
  }
  onRowSelected(row) {
    console.log('clicked row', row);
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
  onRemove(id) {
    const idx = findIndex(this.state.data, { id });

    // this could go through flux etc.
    this.state.data.splice(idx, 1);

    this.setState({
      data: this.state.data
    });
  }
  onToggleColumn(columnIndex) {
    const columns = this.state.columns;

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

function sortHeader(sortable, getSortingColumns) {
  return (value, { columnIndex }) => {
    const sortingColumns = getSortingColumns() || [];

    return (
      <div style={{ display: 'inline' }}>
        <span className="value">{value}</span>
        {transforms.toFormatter(
          sortable(
            value,
            {
              columnIndex
            },
            {
              style: { float: 'right' }
            }
          ),
          'span'
        )}
        {sortingColumns[columnIndex] &&
          <span className="sort-order" style={{ marginLeft: '0.5em', float: 'right' }}>
            {sortingColumns[columnIndex].position + 1}
          </span>
        }
      </div>
    );
  };
}

<AllFeaturesTable />
```
