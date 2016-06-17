/* eslint-disable no-console, no-alert, no-unused-vars, react/prop-types */
import React from 'react';
import find from 'lodash/find';
import {
  Table,
} from '../../src';

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 55,
        },
        {
          id: 101,
          name: 'Brian',
          age: 62,
        },
        {
          id: 102,
          name: 'Joe',
          age: 12,
          parent: 100,
        },
        {
          id: 103,
          name: 'Mike',
          age: 22,
          parent: 101,
        },
        {
          id: 104,
          name: 'Jack',
          age: 33,
          parent: 101,
        },
      ],
      columns: [
        {
          property: 'name',
          header: 'Name',
          cell: ({ value, cellData }) => (
            <span>
              {!cellData.parent && <span
                className="show-more"
                onClick={e => console.log('clicked', value)}
              />}
              {value}
            </span>
          ),
        },
        {
          property: 'age',
          header: 'Age',
        },
      ],
    };

    this.filterData = this.filterData.bind(this);
  }
  render() {
    return (
      <Table
        className="pure-table pure-table-striped"
        columns={this.state.columns}
        data={this.filterData()}
      >
        <Table.Header />

        <Table.Body
          rowKey="id"
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row',
          })}
        />
      </Table>
    );
  }
  filterData() {
    const data = this.state.data;

    return data.filter(d => {
      if (!d.parent) {
        return true;
      }
      const parent = find(data, { id: d.parent });

      return parent && parent.showChildren;
    });
  }
}

export default TreeTable;
