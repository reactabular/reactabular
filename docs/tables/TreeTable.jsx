/* eslint-disable no-console, no-alert, no-unused-vars, react/prop-types */
import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {
  Table,
} from '../../src';

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        // The data has been sorted so that children are after their parents
        {
          id: 100,
          name: 'Adam',
          age: 55,
        },
        {
          id: 102,
          name: 'Joe',
          age: 12,
          parent: 100,
        },
        {
          id: 101,
          name: 'Brian',
          age: 62,
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
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
            value: (name, { cellData }) => (
              <div style={cellData.parent && { paddingLeft: '1em' }}>
                {!cellData.parent && <span
                  className={cellData.showChildren ? 'show-less' : 'show-more'}
                  onClick={e => {
                    const data = this.state.data;
                    const parentIndex = findIndex(data, { id: cellData.id });

                    data[parentIndex].showChildren = !cellData.showChildren;

                    this.setState({ data });
                  }}
                />}
                {name}
              </div>
            ),
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
