Reactabular doesn't come with pagination. Instead you can use an external library, such as [react-pagify](https://github.com/bebraw/react-pagify), for this purpose. Just like with sorting or search, you will have to process your rows through a paginator algorithm.

**Example:**

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import * as Table from 'reactabular-table';
import * as search from 'searchtabular';
import {
  Paginator, paginate, generateRows
} from './helpers';
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
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age']
};
const rows = generateRows(100, schema);
const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    header: {
      label: 'Age'
    }
  }
];

class PaginationTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
      query: {}, // Search query
      columns,
      rows,
      pagination: { // initial pagination settings
        page: 1,
        perPage: 10
      }
    };

    this.onSelect = this.onSelect.bind(this);
  }
  render() {
    const { searchColumn, rows, columns, pagination, query } = this.state;
    const paginated = compose(
      paginate(pagination),
      search.multipleColumns({ columns, query })
    )(rows);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <search.Field
            column={searchColumn}
            query={query}
            columns={columns}
            rows={rows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>

        <Table.Provider columns={columns}>
          <Table.Header />

          <Table.Body rows={paginated.rows} rowKey="id" />
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
}

<PaginationTable />
```
