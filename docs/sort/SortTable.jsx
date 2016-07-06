import React from 'react';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms
} from '../../src';

export default class SortTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || {},

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
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          header: {
            label: 'Name',
            transforms: [sortable()]
          },
          cell: {
            property: 'name'
          }
        }
      ],
      data: [
        {
          id: 100,
          name: 'Adam'
        },
        {
          id: 101,
          name: 'Brian'
        },
        {
          id: 102,
          name: 'Jake'
        },
        {
          id: 103,
          name: 'Jill'
        }
      ]
    };
  }
  render() {
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sort.sorter({
      columns: this.state.columns,
      sortingColumns,
      sort: orderBy
    })(data);

    return (
      <div>
        <Table.Provider columns={columns} data={sortedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
}
