/* eslint-disable no-shadow */
import React from 'react';
import {
  Table, Search,
} from '../../src';

export default class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {},
      columns: [
        {
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
          },
        },
        {
          header: {
            value: 'Age',
          },
          cell: {
            property: 'age',
          },
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 12,
        },
        {
          id: 101,
          name: 'Brian',
          age: 7,
        },
        {
          id: 102,
          name: 'Jake',
          age: 88,
        },
        {
          id: 103,
          name: 'Jill',
          age: 50,
        },
      ],
    };
  }
  render() {
    const { data, columns, search } = this.state;
    let searchedData = Search.search(data, columns, search);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={search => this.setState({ search })}
          />
        </div>
        <Table columns={columns} data={searchedData}>
          <Table.Header />

          <Table.Body rowKey="id" />
        </Table>
      </div>
    );
  }
}
