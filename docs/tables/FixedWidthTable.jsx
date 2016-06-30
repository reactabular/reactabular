/* eslint-disable no-shadow */
import React from 'react';
import { Search } from '../helpers';
import {
  Table, search
} from '../../src';

function generateFixedWidthHeader(label) {
  return class FixedWidthHeader extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        style: {}
      };
    }
    componentDidMount() {
      // setTimeout is used to capture width correctly
      // More info: github.com/facebook/react-native/issues/953
      setTimeout(() => {
        const width = this.refs.header.clientWidth;

        this.setState({
          style: { width }
        });
      });
    }
    render() {
      return (
        <th style={this.state.style} ref="header">{label}</th>
      );
    }
  };
}

export default class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            component: generateFixedWidthHeader('Name')
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            component: generateFixedWidthHeader('Address')
          },
          cell: {
            property: 'address'
          }
        }
      ],
      data: [
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
    const { data, columns, query } = this.state;
    const searchedData = search.multipleColumns({ data, columns, query });

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
        <Table columns={columns} data={searchedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table>
      </div>
    );
  }
}
