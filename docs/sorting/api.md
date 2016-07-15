The Sort API consists of the following functions:

* `sort.byColumn` - Helper for sorting per one column. Discard possible existing sorting state.
* `sort.byColumns` - Helper for sorting per multiple columns.
* `sort.sorter` - Helper for sorting based on the sorting protocol.
* `sort.sort` - Sorting transform that can be used to select a sorting algorithm.

## Sorting Protocol

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

## `sort.byColumn({ sortingColumns: <sorting columns>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => <sorting colums> || {}`

`sort.byColumn` allows you to sort per one column. If you are trying to sort the same column, it will cycle between ascending, descending, and no sorting. In case you are trying to sort some other column, it will start from the ascending state while discarding the existin sorting state.

## `sort.byColumns({ sortingColumns: <sorting columns>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => <sorting columns> || {}`

`sort.byColumns` is like `sort.byColumn` except it doesn't discard possible existing sort state and instead accumulates it. This allows you to perform sorting over multiple columns while refining the results.

## `sort.sorter({ columns: [<object>], sortingColumns: <sorting columns>, sort: <function>})([<data to sort>]) => [<sorted data>]`

`sort.sorter` sorts the passed `data` using a `sortingColumns` definitions and a `sort` function. It has been designed to work based on [lodash.orderBy](https://lodash.com/docs#orderBy) signature and is able to resolve values based on `columns.cell.resolve`.

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
  // Point the transform to your data. React state can work for this purpose
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

* [Sort and Search](/examples/sort-and-search)
