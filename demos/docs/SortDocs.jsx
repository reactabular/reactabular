/* eslint-disable max-len, no-shadow */
import React from 'react';
import orderBy from 'lodash/orderBy';
import { ReactSpecimen } from 'catalog';
import { CustomPage } from '../components';
import {
  behaviors, sort, Search, Table,
} from '../../src';

const sorter = sort.byColumns; // sort.byColumn would work too

class SortTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = behaviors.sort.bind(
      null,
      {
        // Point the behavior to your data. React state can work for this purpose
        // but you can use a state manager as well.
        getSortingColumns: () => this.state.sortingColumns || [],

        // The user requested sorting, adjust the sorting state accordingly.
        // This is a good chance to pass the request through a sorter.
        onSort: column => {
          this.setState({
            sortingColumns: sorter(
              this.state.sortingColumns, column
            ),
          });
        },
      }
    );

    this.state = {
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          property: 'name',
          header: sortable('Name'),
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
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sorter.sort(
      data,
      sortingColumns,
      orderBy
    );

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
        <Table columns={columns} data={sortedData}>
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
      Reactabular comes with sorting helpers. The general workflow is as follows:
    </p>

    <ol>
      <li>Set up the sort behavior. Its purpose is to track when the user requests sorting and render possibly matching sorting condition as a class for styling.</li>
      <li>Set up a sort helper. There are helpers for sorting per one column and one for sorting per multiple columns. The helpers handle managing sorting conditions and actual sorting. If you have a back-end, you can skip the latter.</li>
      <li>Sort the data before rendering.</li>
      <li>Feed the sorted data to a <code>Table</code>.</li>
    </ol>

    <ReactSpecimen span={6}>
      <SortTable />
    </ReactSpecimen>
  </CustomPage>
);
