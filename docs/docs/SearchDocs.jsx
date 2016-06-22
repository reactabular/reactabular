/* eslint-disable max-len, no-shadow, quotes */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../helpers';
import {
  Table, Search,
} from '../../src';

class SearchTable extends React.Component {
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

export default () => (
  <CustomPage>
    <p>
      Reactabular comes with a search helper. It consists of a <code>Search</code> component and a search algorithm that can be applied to the data. Just like with sorting, you have to apply the algorithm to the data just before rendering. If you were sorting the data as well, you would probably want to apply the search algorithm before sorting.
    </p>

    <p>
      A column is considered searchable in case it has a unique <code>property</code> defined. It is possible to customize <code>Search</code> component further by passing a <code>i18n</code> prop to it (<code>{`<Search i18n={{all: 'Kaikki'}} ... />`}</code>).
    </p>

    <p>
      It is also possible to filter per column. See the FullTable example for a demo. It uses a custom <code>ColumnFilters</code> component designed for the task.
    </p>

    <ReactSpecimen span={6}>
      <SearchTable />
    </ReactSpecimen>
  </CustomPage>
);
