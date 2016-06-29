/* eslint-disable no-console, no-alert, no-shadow, no-unused-vars, react/prop-types */
import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import range from 'lodash/range';
import jsf from 'json-schema-faker';

import {
  Table
} from '../../src';


const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid'
    },
    name: {
      type: 'string',
      faker: 'name.findName'
    },
    age: {
      $ref: '#/definitions/age'
    }
  },
  required: ['id', 'name', 'age'],
  definitions: {
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
      exclusiveMinimum: true
    }
  }
};
const data = generateParents(range(100).map(() => jsf(schema)));

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      columns: this.getColumns()
    };
  }
  getColumns() {
    return [
      {
        header: {
          label: 'Name'
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
          }
        }
      },
      {
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age'
        }
      }
    ];
  }
  render() {
    return (
      <Table
        className="pure-table pure-table-striped"
        columns={this.state.columns}
        data={filterTree(this.state.data)}
        rowKey="id"
      >
        <Table.Header />

        <Table.Body
          row={(row, rowIndex) => ({
            className: rowIndex % 2 ? 'odd-row' : 'even-row'
          })}
        />
      </Table>
    );
  }
}

function generateParents(data) {
  let previousParent;

  return data.map(d => {
    const ret = {
      ...d,
      parent: previousParent
    };

    // Generate child instead of a sibling
    if (previousParent && Math.random() > 0.8) {
      // Do nothing
    } else if (Math.random() > 0.8) {
      // Back to root
      previousParent = null;
    } else {
      previousParent = d.id;
    }

    return ret;
  });
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
  let parentIndex;

  while (cell) {
    if (cell.id === previousParent) {
      parents.push(cell);

      if (!cell.parent) {
        break;
      }
    }

    if (cell.parent !== previousParent) {
      previousParent = cell.parent;
    }

    currentIndex--;

    cell = data[currentIndex];
  }

  return parents;
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
