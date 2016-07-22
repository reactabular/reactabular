Depending on the content of your rowsset, you may encounter issues with column widths jumping as certain rows is filtered in or out. This table mitigates such issues by explicitly setting its width after mounting.

```jsx
/*
import React from 'react';
import { Search } from './helpers';
import { Table, search } from 'reactabular';
*/

const { Table, search } = reactabular;

class FixedWidthColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Address'
          },
          cell: {
            property: 'address'
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
    const { rows, columns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            rows={rows}
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
FixedWidthHeader.propTypes = {
  children: React.PropTypes.any
};

<FixedWidthColumnsTable />
```
