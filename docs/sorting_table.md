# Sorting a Table

Reactabular comes with a little helper to make sorting easier. It is possible to replace the provided sorter with something more advanced. Here's the basic idea:

```javascript
var sortColumn = require('reactabular').sortColumn;

...

// state
columnNames: {
    onClick: (column) => {
        sortColumn(
            this.state.columns,
            column,
            this.setState.bind(this)
        );
    },
}
```

A more sophisticated (multi-column) sort example (each column can be independently cycled through ascending, descending, and no sort, and sorts are applied in the order they were invoked via the following onClick handler):

```javascript
var sortColumns = require('reactabular').sortColumns;

...

// state
columnNames: {
    onClick: (column) => {
        sortColumns(this.state.columns,
        this.state.sortedColumns,
        column,
        this.setState.bind(this)
    }
}
```

In addition we need to provide `columnNames` to our `Table` like this:

```jsx
import {sortByOrder} from 'lodash';

render() {
    var columnNames = this.state.columnNames;
    var data = this.state.data;
    var pagination = this.state.pagination;

    if (this.state.search.query) {
        ... // search logic
    }

    // sorting data here
    data = sortColumn.sort(data, this.state.sortingColumn, sortByOrder);

    var paginated = Paginator.paginate(data, pagination);

    return (
        <div>
            ...
            <Table columns={columns} data={paginated.data} columnNames={columnNames} />
            ...,
        </div>
    );
}
```

After that it should be possible to sort table content by hitting various column names at header. `sortColumn` sets either `sort-asc` or `sort-desc` class for currently active header column. This allows some degree of styling.

You can get something basic looking by utilizing `./style.css`. In Webpack you can import it to your project using `require('reactabular/style.css')` provided you have appropriate loaders set up.

> `header` key-value pairs will be applied as attributes to `th`'s. If you have an event handler (ie. something starting with `on`), the first parameter provided will be the column in question. The second one will be React event.
