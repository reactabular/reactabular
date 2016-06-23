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
        // The data has been sorted so that children are directly after their parents
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
          parent: 103,
        },
        {
          id: 105,
          name: 'Jill',
          age: 11,
          parent: 104,
        },
        {
          id: 106,
          name: 'Bob',
          age: 44,
          parent: 104,
        },
        {
          id: 107,
          name: 'Peter',
          age: 66,
          parent: 106,
        },
        {
          id: 108,
          name: 'James',
          age: 12,
          parent: 107,
        },
      ],
      columns: [
        {
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
            resolve: (name, { cellData }) => {
              const data = this.state.data;

              return (
                <div style={{ paddingLeft: `${getLevel(data, cellData) * 1}em` }}>
                  {hasChildren(data, cellData.id) && <span
                    className={cellData.showChildren ? 'show-less' : 'show-more'}
                    onClick={e => {
                      const parentIndex = findIndex(data, { id: cellData.id });

                      data[parentIndex].showChildren = !cellData.showChildren;

                      this.setState({ data });
                    }}
                  />}
                  {name}
                </div>
              );
            },
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

// This can be memoized for extra performance
function getLevel(data, item) {
  // Get parent of parent till there is no parent -> level
  let level = 0;
  let cell = item;

  while (cell) {
    if (cell.parent) {
      level++;
    }

    // Micro-optimization - operate through index instead
    // and rely on order. In the current structure it would
    // be safe to take a peek at the previous item based on
    // the index.
    cell = find(data, { id: cell.parent });
  }

  return level;
}

// This can be memoized for extra performance
function hasChildren(data, itemId) {
  // Micro-optimization - take a peek at the next item
  // based on index and see if it has children directly.
  return !!find(data, { parent: itemId });
}

export default TreeTable;
