/* eslint-disable no-shadow */
import React from 'react';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';

import { generateData, Search } from '../helpers';
import {
  Table, sort, transforms, search
} from '../../src';

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'company', 'age']
};
const data = generateData(20, schema);

export default class SortAndSearchTable extends React.Component {
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
    const sortableHeader = sortHeader(() => this.state.sortingColumns);

    const resettable = () => (value, {columnIndex}) => ({
      onDoubleClick: () => {
        let sortingColumns = this.state.sortingColumns;
        delete sortingColumns[columnIndex];
        this.setState({
          sortingColumns,
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
            // Resetable operates on cell level while sorting is handled by
            // an element within -> no conflict between click and double click.
            transforms: [resettable()],
            format: sortableHeader(sortable())
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Company',
            transforms: [resettable()],
            format: sortableHeader(sortable())
          },
          cell: {
            property: 'company'
          }
        },
        {
          header: {
            label: 'Age',
            transforms: [resettable()],
            format: sortableHeader(sortable())
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data
    };
  }
  render() {
    const { data, columns, sortingColumns, query } = this.state;
    const searchedData = search.multipleColumns({ columns, query })(data);
    const sortedData = sort.sorter({ columns, sortingColumns, sort: orderBy })(searchedData);

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
        <Table.Provider columns={columns} data={sortedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
}

function sortHeader(getSortingColumns) {
  return sortable => (value, { column, columnIndex }) => {
    const property = column.cell && column.cell.property;
    const sortingColumns = getSortingColumns();
    const idx = columnIndex;

    return (
      <div style={{ display: 'inline' }}>
        <span className="value">{value}</span>
        {idx >= 0 &&
          <span className="sort-order" style={{ marginLeft: '0.5em' }}>
            {idx + 1}
          </span>
        }
        {sortable.toFormatter(value, {columnIndex})}
      </div>
    );
  };
}
