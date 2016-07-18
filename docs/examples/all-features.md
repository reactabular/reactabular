The following example uses majority of Reactabular's features and combines them into a single example.

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import keys from 'lodash/keys';
import values from 'lodash/values';
import transform from 'lodash/transform';
import {
  Table, search, edit, sort, highlight, resolve
} from 'reactabular';

import {
  ColumnFilters, Paginator, PrimaryControls,
  generateRows, paginate, VisibilityToggles,
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
      rows: generateRows(100, schema), // initial rows
      query: {}, // search query
      sortingColumns: null, // reference to the sorting columns
      columns: this.getColumns(), // initial columns
      pagination: { // initial pagination settings
        page: 1,
        perPage: 10
      }
    };

    this.onRow = this.onRow.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  getColumns() {
    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index].editing = columnIndex;

        this.setState({ rows });
      },
      onValue: ({ value, rowData, property }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index][property] = value;
        rows[index].editing = false;

        this.setState({ rows });
      }
    });
    const sortable = sort.sort({
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
      getWidth: column => column.header.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.header.props.style = {
          ...column.header.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    return [
      {
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
          ),
          props: {
            style: {
              width: 200
            }
          }
        },
        cell: {
          property: 'name',
          transforms: [editable(edit.input())],
          format: highlight.cell
        },
        visible: true
      },
      {
        header: {
          label: 'Position',
          format: (v, extra) => resizable(sortableHeader(v, extra), extra),
          props: {
            style: {
              width: 100
            }
          }
        },
        cell: {
          property: 'position',
          transforms: [editable(edit.input())],
          format: highlight.cell
        },
        visible: true
      },
      {
        header: {
          label: 'Boss',
          format: sortableHeader,
          props: {
            style: {
              width: 100
            }
          }
        },
        cell: {
          property: 'boss.name',
          transforms: [editable(edit.input())],
          format: highlight.cell
        },
        visible: true
      },
      {
        header: {
          label: 'Country',
          format: sortableHeader,
          props: {
            style: {
              width: 100
            }
          }
        },
        cell: {
          property: 'country',
          transforms: [editable(
            edit.dropdown({
              options: transform(countries, (result, name, value) => {
                result.push({ value, name });
              }, [])
            })
          )],
          format: (country, extra) => highlight.cell(countries[country], extra),
          // Resolve hint for search and highlighting
          resolve: country => countries[country]
        },
        visible: true
      },
      {
        header: {
          label: 'Salary',
          format: sortableHeader,
          props: {
            style: {
              width: 100
            }
          }
        },
        cell: {
          property: 'salary',
          transforms: [editable(edit.input({ props: { type: 'number' } }))],
          format: (salary, extra) => (
            <span onDoubleClick={() => alert(`salary is ${salary}`)}>
              {highlight.cell(salary, extra)}
            </span>
          )
        },
        visible: true
      },
      {
        header: {
          label: 'Active',
          format: sortableHeader,
          props: {
            style: {
              width: 100
            }
          }
        },
        cell: {
          property: 'active',
          transforms: [editable(edit.boolean())],
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
      columns, rows, pagination, sortingColumns, query
    } = this.state;
    const cols = columns.filter(column => column.visible);
    const paginated = compose(
      paginate(pagination),
      sort.sorter({ columns: cols, sortingColumns, sort: orderBy }),
      highlight.highlighter({ columns: cols, matches: search.matches, query }),
      search.multipleColumns({ columns: cols, query }),
      resolve.resolve({
        columns: cols,
        method: (row, column) => resolve.byFunction('cell.resolve')(
          resolve.nested(row, column),
          column
        )
      })
    )(rows);

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
          rows={rows}
          onPerPage={this.onPerPage}
          onSearch={this.onSearch}
        />

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={cols}
        >
          <Table.Header>
            <ColumnFilters columns={cols} onChange={this.onSearch} />
          </Table.Header>

          <Table.Body onRow={this.onRow} rows={paginated.rows} rowKey="id" />

          <tfoot>
            <tr>
              <td>
                You could show sums etc. here in the customizable footer.
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total salary: {
                paginated.rows.reduce((a, b) => a + b.salary, 0)
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
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => this.onRowSelected(row)
    };
  }
  onRowSelected(row) {
    console.log('clicked row', row);
  }
  onSearch(query) {
    this.setState({
      query
    });
  }
  onSelect(page) {
    const pages = Math.ceil(
      this.state.rows.length / this.state.pagination.perPage
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
    const idx = findIndex(this.state.rows, { id });

    // this could go through flux etc.
    this.state.rows.splice(idx, 1);

    this.setState({
      rows: this.state.rows
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
        {React.createElement(
          'span',
          sortable(
            value,
            {
              columnIndex
            },
            {
              style: { float: 'right' }
            }
          )
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
