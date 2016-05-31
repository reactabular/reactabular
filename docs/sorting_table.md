# Sorting a Table

Reactabular comes with helpers to make sorting easier right out of the box.

The general workflow is as follows:

1. import the sort helper. the sort helper does two things:
  - updates your component's state, which dictates how the table is to be sorted
  - exposes a `.sort` function to actually sort the data
1. set up click handlers to update which column(s) we're sorting against
1. sort the data, pre-render
1. feed in the sorted data to your `reactabular` table

## Import the `sort` Utility

```js
var sortUtility = require('reactabular').sortColumn;
```

or, if you want to support sorting against multiple columns:

```js
var sortUtility = require('reactabular').sortColumns;
```

## Set Up Click Handlers

```js
// place in getInitialState, or, if using es6 classes, `this.setState = ...`
{
  someOtherInitialState: ...,
  // for supporting sort against a single column at a time
  columnNames: {
      onClick: (column) => {
          sortUtility(
              this.state.columns,
              column,
              this.setState.bind(this)
          );
      },
  },
  // or...
  // for supporting sort against multiple columns
  columnNames: {
      onClick: (column) => {
          sortUtility(
              this.state.columns,
              this.state.sortedColumns,
              column,
              this.setState.bind(this)
          );
      },
  }
}
```

## Sort and Render

```jsx
import orderBy from 'lodash/orderBy';

render() {
    var columnNames = this.state.columnNames;
    var data = this.state.data;
    var sortingColumn = this.state.sortingColumn;
    // ^^ this.state.sortingColumn OR this.state.sortingColumns,
    // depending on which sortUtility you imported

    // sort data!
    data = sortUtility.sort(data, sortingColumn, orderBy);

  // @NOTE, `columnNames` is required for sorting.
  // the imported sortUtility manages this attr for us
    return (
        <Table
            columns={columns}
            data={paginated.data}
            columnNames={columnNames}
        />
    );
}
```

Now, you should be able to sort table content by clicking header cells.

The imported `sortUtility` sets either the `sort-asc` or `sort-desc` class for currently active header column. This allows some degree of styling.

You can get something basic styles (e.g. UP/DOWN arrows) by importing `./style.css`. In Webpack you can import it to your project using `require('reactabular/style.css')` provided you have appropriate loaders set up.

## Sort Events

`header` key-value pairs will be applied as attributes to `th`'s. If you have an event handler (ie. something starting with `.on`), the first parameter provided will be the column in question. The second one will be React event.
