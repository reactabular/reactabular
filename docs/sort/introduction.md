Reactabular comes with sorting helpers that make it possible to manage sorting related classes and to sort data based on them.

The general workflow goes as follows:

1. Set up the sort transform. Its purpose is to track when the user requests sorting and render possibly matching sorting condition as a class for styling.
2. Set up a sort helper. There are helpers for sorting per one column and one for sorting per multiple columns. The helpers handle managing sorting conditions and actual sorting. If you have a back-end, you can skip the latter.
3. Sort the data before rendering.
4. Feed the sorted data to a `Table`.

**Example:**

```react
<SortTable />
```

```code
lang: jsx
---
import React from 'react';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms
} from 'reactabular';

const initialData = [
  {
    id: 100,
    name: 'Adam',
    age: 10
  },
  {
    id: 101,
    name: 'Brian',
    age: 43
  },
  {
    id: 102,
    name: 'Jake',
    age: 33
  },
  {
    id: 103,
    name: 'Jill',
    age: 63
  }
];

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
      // Sort the first column in a descending way by default.
      // "asc" would work too and you can set multiple if you want.
      sortingColumns: {
        0: 'desc'
      },
      columns: [
        {
          header: {
            label: 'Name',
            transforms: [sortable]
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Age',
            transforms: [sortable]
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data: initialData
    };
  }
  render() {
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sort.sorter({
      columns,
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
```
