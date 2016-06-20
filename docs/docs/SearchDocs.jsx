/* eslint-disable max-len, no-shadow */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../components';
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
          property: 'name',
          header: 'Name',
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
