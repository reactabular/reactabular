The Sort API consists of three functions. `sort.byColumn` and `sort.byColumns` are meant for managing sorting state changes per column or columns. `sort.sorter` has been designed to perform actual sorting based on this protocol.

**`sort.byColumn({ sortingColumns: <sort.byColumn>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => [{ property: <string>, sort: <asc|desc>}] || []`**

`sort.byColumn` allows you to sort per one column. If you are trying to sort the same column, it will cycle between ascending, descending, and no sorting. In case you are trying to sort some other column, it will start from the ascending state.

**`sort.byColumns({ sortingColumns: <sort.byColumns>, sortingOrder: {FIRST: <string>, <string>: <string>}, selectedColumn: <string> }) => [{ property: <string>, sort: <asc|desc>}] || []`**

`sort.byColumns` is like `sort.byColumn` except it doesn't discard possible existing sort state. This allows you to perform sorting over multiple columns.

**`sort.sorter({ sortingColumns: <sort.byColumn|sort.byColumns>, sort: <function>})([<data to sort>]) => [<sorted data>]`**

`sort.sorter` sorts the passed `data` using a `sortingColumns` definitions and a `sort` function. It has been designed to work based on [lodash.orderBy](https://lodash.com/docs#orderBy) signature.

## Customizing Sorting Order

It is possible to customize the sorting order of `sort.byColumn` and `sort.byColumns` by passing an object describing the sorting. It should contain `FIRST` key to describe the starting point. The remaining key-value pairs should form a cycle.

**Example:**

```code
lang: javascript
---
const sortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
};
```
