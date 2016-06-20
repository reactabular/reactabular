/* eslint-disable max-len, no-shadow */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../components';
import {
  Table, Search, formatters,
} from '../../src';

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    const highlighter = column => formatters.highlight(value => {
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
          property: 'name',
          header: 'Name',
          cell: ({ value }) => highlighter('name')(value),
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
        },
        {
          id: 101,
          name: 'Brian',
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
