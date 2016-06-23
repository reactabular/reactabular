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
          id: 109,
          name: 'Marge',
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
              // Optimization - Operate based on index for faster lookups
              const cellIndex = findIndex(data, { id: cellData.id });

              return (
                <div style={{ paddingLeft: `${getLevel(data, cellIndex) * 1}em` }}>
                  {hasChildren(data, cellIndex) && <span
                    className={cellData.showChildren ? 'show-less' : 'show-more'}
                    onClick={e => {
                      data[cellIndex].showChildren = !cellData.showChildren;

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
  }
  render() {
    return (
      <Table
        className="pure-table pure-table-striped"
        columns={this.state.columns}
        data={filterTree(this.state.data)}
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
}

function filterTree(data) {
  return data.filter((item, i) => {
    if (!item.parent) {
      return true;
    }

    const parents = getParents(data, i);

    return parents.filter(parent => parent.showChildren).length === parents.length;
  });
}

// This can be memoized for extra performance.
function getParents(data, itemIndex) {
  const parents = [];
  let currentIndex = itemIndex;
  let cell = data[itemIndex];
  let previousParent;

  while (cell.parent) {
    if (cell.parent !== previousParent) {
      parents.push(cell.parent);

      previousParent = cell.parent;
    }

    currentIndex--;

    cell = data[currentIndex];
  }

  // Resolve each parent to an actual item. It could be
  // better to merge this with above logic.
  return data.filter(d => parents.indexOf(d.id) >= 0);
}

// This can be memoized for extra performance.
function getLevel(data, itemIndex) {
  // Get parent of parent till there is no parent -> level.
  // This relies on data order!
  let level = 0;
  let currentIndex = itemIndex;
  let cell = data[itemIndex];
  let previousParent;

  while (cell) {
    if (cell.parent) {
      if (previousParent !== cell.parent) {
        level++;
      }
    } else {
      break;
    }

    currentIndex--;

    previousParent = cell.parent;
    cell = data[currentIndex];
  }

  return level;
}

// This can be memoized for extra performance.
function hasChildren(data, itemIndex) {
  // See if the next item points to the current one.
  // This relies on data order!
  const currentItem = data[itemIndex];
  const nextItem = data[itemIndex + 1];

  const ret = nextItem && currentItem.id === nextItem.parent;

  return ret;
}

export default TreeTable;
