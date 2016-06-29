/* eslint-disable no-shadow */
import React from 'react';
import { Search } from '../helpers';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms, search
} from '../../src';

export default class SortAndSearchTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || [],

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });

    this.state = {
      query: {}, // Search query
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          header: {
            label: 'Name',
            transforms: [sortable('name')]
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'age',
            transforms: [sortable('age')]
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 11
        },
        {
          id: 101,
          name: 'Brian',
          age: 42
        },
        {
          id: 102,
          name: 'Brian',
          age: 22
        },
        {
          id: 103,
          name: 'Jake',
          age: 88
        },
        {
          id: 104,
          name: 'Jill',
          age: 7
        },
        {
          id: 105,
          name: 'Jill',
          age: 88
        }
      ]
    };
  }
  render() {
    const { data, columns, sortingColumns, query } = this.state;
    const searchedData = search.multipleColumns({ data, columns, query });
    const sortedData = sort.sorter({ data: searchedData, sortingColumns, sort: orderBy });

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table columns={columns} data={sortedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table>
      </div>
    );
  }
}
