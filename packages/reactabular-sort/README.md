Reactabular's sorting helpers make it possible to manage sorting related classes and to sort rows based on them. You can either use them through `reactabular` or `reactabular-sort`.

## How to Use?

The general workflow goes as follows:

1. Set up the `sort` transform. Its purpose is to track when the user requests sorting and render possibly matching sorting condition as a class for styling.
2. Set up a sort helper. There are helpers for sorting per one column (`sort.byColumn`) and one for sorting per multiple columns (`sort.byColumns`). The helpers handle managing sorting conditions and actual sorting. If you have a back-end, you can skip the latter.
3. Sort the rows before rendering.
4. Feed the sorted rows to a `Table`.

**Example:**

```jsx
/*
import React from 'react';
import orderBy from 'lodash/orderBy';
import { Table, sort } from 'reactabular';
*/

const initialRows = [
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
    name: 'Brian',
    age: 23
  },
  {
    id: 103,
    name: 'Jake',
    age: 33
  },
  {
    id: 104,
    name: 'Jill',
    age: 63
  }
];

class SortTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = sort.sort({
      // Point the transform to your rows. React state can work for this purpose
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
        0: {
          direction: 'desc',
          position: 0
        }
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
      rows: initialRows
    };
  }
  render() {
    const { rows, columns, sortingColumns } = this.state;
    const sortedRows = sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy
    })(rows);

    return (
      <div>
        <Table.Provider columns={columns}>
          <Table.Header />

          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<SortTable />
```

## API

The API consists of the following functions:

* `sort.byColumn` - Helper for sorting per one column. Discard possible existing sorting state.
* `sort.byColumns` - Helper for sorting per multiple columns.
* `sort.sorter` - Helper for sorting based on the sorting protocol.
* `sort.sort` - Sorting transform that can be used to select a sorting algorithm.

### Sorting Protocol

Sorting relies on a structure like this to describe what is being sorted and in what order:

```javascript
const sortingColumns = {
  0: {
    direction: 'asc',
    position: 1
  },
  1: {
    direction: 'desc',
    position: 0
  }
};
```

It maps column index to sorting state and can contain multiple sorters.

### `sort.byColumn({ sortingColumns: <sorting columns>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => <sorting colums> || {}`

`sort.byColumn` allows you to sort per one column. If you are trying to sort the same column, it will cycle between ascending, descending, and no sorting. In case you are trying to sort some other column, it will start from the ascending state while discarding the existing sorting state.

### `sort.byColumns({ sortingColumns: <sorting columns>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => <sorting columns> || {}`

`sort.byColumns` is like `sort.byColumn` except it doesn't discard possible existing sort state and instead accumulates it. This allows you to perform sorting over multiple columns while refining the results.

### `sort.sorter({ columns: [<object>], sortingColumns: <sorting columns>, sort: <function>})([<rows to sort>]) => [<sorted rows>]`

`sort.sorter` sorts the passed `rows` using a `sortingColumns` definitions and a `sort` function. It has been designed to work based on [lodash.orderBy](https://lodash.com/docs#orderBy) signature.

If you want to evaluate columns in a reverse order instead of the default, you can reverse `sort` function like this:

```javascript
const reverseSort = (data, columnIndexList, orderList) => (
  orderBy(data, columnIndexList.slice().reverse(), orderList.slice().reverse())
);
```

## Customizing Sorting Order

It is possible to customize the sorting order of `sort.byColumn` and `sort.byColumns` by passing an object describing the sorting. It should contain `FIRST` key to describe the starting point. The remaining key-value pairs should form a cycle.

Assuming you are using the `sort` transform, the order values are used for generating the classes you see at the user interface.

The default order cycles between `asc`, `desc`, and `''` (no sort).

You could implement a custom order cycling between `asc` and `desc` like this:

```javascript
const sortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};
```

## The `sort` Transform

The `sort` transform has been designed to track when the user requests sorting and render possibly matching sorting condition as a class for styling. In addition you will need to use specific sort helpers to handle the sorting logic. The helpers have been encapsulated within the `sort` module.

**Example:**

```javascript
...
import { sort } from 'reactabular';

...

const sortable = sort.sort({
  // Point the transform to your rows. React state can work for this purpose
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

...

// Mark a header as sortable
columns: [
  {
    header: {
      label: 'name',
      transforms: [sortable()]
    },
    cell: {
      property: 'name'
    }
  }
]
```

## See Also

* [Sort and Search](http://reactabular.js.org/#/examples/sort-and-search)
