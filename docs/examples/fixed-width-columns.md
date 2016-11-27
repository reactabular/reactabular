Depending on the content of your rows, you may encounter issues with column widths jumping as certain rows is filtered in or out. This table mitigates such issues by explicitly setting its width after mounting.

```jsx
/*
import React from 'react';
import * as Table from 'reactabular-table';
import * as search from 'searchtabular';
*/

class FixedWidthColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
      query: {}, // Search query
      columns: [
        {
          property: 'name',
          header: {
            label: 'Name'
          }
        },
        {
          property: 'address',
          header: {
            label: 'Address'
          }
        }
      ],
      rows: [
        {
          id: 1,
          name: 'This is a very long title that goes on and on',
          address: '85 Peachfield Road'
        },
        {
          id: 2,
          name: 'Here is a shorter one',
          address: '77 Newmarket Road'
        }
      ]
    };
  }
  render() {
    const components = {
      header: {
        cell: FixedWidthHeader
      }
    };
    const { searchColumn, rows, columns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);

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
        <Table.Provider
          components={components}
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={searchedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

class FixedWidthHeader extends React.Component {
  constructor(props) {
    super(props);

    this.widthSet = false;
    this.state = {
      style: {}
    };
  }
  componentDidUpdate() {
    if (this.widthSet) {
      return;
    }

    const width = this.refs.header.clientWidth;

    // Wait till width is available and set then
    if (width) {
      this.widthSet = true;

      this.setState({ // eslint-disable-line react/no-did-update-set-state
        style: { width }
      });
    }
  }
  render() {
    return (
      <th style={this.state.style} ref="header">{this.props.children}</th>
    );
  }
}

<FixedWidthColumnsTable />
```
