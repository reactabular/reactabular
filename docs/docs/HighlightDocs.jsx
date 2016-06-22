/* eslint-disable max-len, no-shadow */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../helpers';
import {
  Table, Search, formatters,
} from '../../src';

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    const highlight = column => formatters.highlight(value => {
      const { search } = this.state;

      return Search.matches(
        column,
        value,
        search[Object.keys(search).pop()]
      );
    });

    this.state = {
      search: {},
      columns: [
        {
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
            format: highlight('name'),
          },
        },
        {
          header: {
            value: 'Age',
          },
          cell: {
            property: 'age',
            format: highlight('name'),
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

export default () => (
  <CustomPage>
    <p>
      Matching search results can be be Highlighted using a specific <code>highlight</code> formatter.
    </p>

    <ReactSpecimen span={6}>
      <HighlightTable />
    </ReactSpecimen>
  </CustomPage>
);
