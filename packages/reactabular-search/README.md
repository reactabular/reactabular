Reactabular comes with search helpers. It consists of search algorithms that can be applied to the rows. Just like with sorting, you have to apply it to the rows just before rendering. A column is considered searchable in case it has a unique `property` defined.

## How to Use?

The general workflow goes as follows:

1. Set up a `Search` control that outputs a query in `{<column>: <query>}` format. If `<column>` is `all`, then the search will work against all columns. Otherwise it will respect the exact columns set.
2. Before rendering the rows, perform `search.multipleColumns({ columns, query })(rows)`. This will filter the rows based on the passed `rows`, `columns` definition, and `query`. A lazy way to do this is to filter at `render()` although you can do it elsewhere too to optimize rendering.
3. Pass the filtered rows to `Table`.

**Example:**

```jsx
/*
import React from 'react';
import { Search } from './helpers';
import {
  Table, search
} from 'reactabular';
*/

const { Table, search } = reactabular;

class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
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
      ],
      rows: [
        {
          id: 100,
          name: 'Adam',
          age: 12
        },
        {
          id: 101,
          name: 'Brian',
          age: 7
        },
        {
          id: 102,
          name: 'Jake',
          age: 88
        },
        {
          id: 103,
          name: 'Jill',
          age: 50
        }
      ]
    };
  }
  render() {
    const { rows, columns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider columns={columns}>
          <Table.Header />

          <Table.Body rows={searchedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<SearchTable />
```

> You can find the `Search` helper from `docs/helpers` to get the basic idea. It's not included in the core distribution.

## API

The Search API consists of three parts. Out of these `search.multipleColumns` and `search.matches` are the most useful ones for normal usage. If the default search strategies aren't enough, it's possible to implement more as long as you follow the same interface.

### Search

**`search.multipleColumns({ columns: [<object>], query: {<column>: <query>}, strategy: <strategy>, transform: <transform> })([<rows to query>]) => [<filtered rows>]`**

This is the highest level search function available. It expects `rows` and `columns` in the same format the `Table` uses. `query` object describes column specific search queries.

It uses `infix` strategy underneath although it is possible to change it. By default it matches in a case **insensitive** manner. If you want case sensitive behavior, pass `a => a`(identity function) as `transform`.

**`search.singleColumn({ columns: [<object>], searchColumn: <string>, query: <string>, strategy: <strategy>, transform: <transform> })([<rows to query>]) => [<filtered rows>]`**

This is a more specialized version of `search.multipleColumns`. You can use it to search a specific column through `searchColumn` and `query`.

### Matchers

**`search._columnMatches({ rows: [<object>], column: [<object>], row: <object>, strategy: <strategy>, transform: <transform> }) => <boolean>`**

This is a function that can be used to figure out all column specific matches. It is meant only for **internal usage** of the library.

**`search.matches({ value: <string>, query: <string>, strategy: <strategy>, transform: <transform> }) => [{ startIndex: <number>, length: <number> }]`**

This function returns matches against the given value and query. This is particularly useful with highlighting.

### Strategies

**`search.strategies.infix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]`**

Search uses `infix` strategy by default. This means it will match even if the result is in the middle of a `searchText`.

The strategies operate in two passes - evaluation and matching. The evaluation pass allows us to implement perform fast boolean check on whether or not a search will match. Matching gives exact results.

**`search.strategies.prefix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]`**

`prefix` strategy matches from the start.

## Handling User Input

Besides the search API itself, you are going to need some way to handle the user input. The following implementation tracks the search query and provides it through the `onChange` prop. You can consume it from there and plug it into the search algorithm to filter rows.

```jsx
/*
import React from 'react';
*/

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: 'all',
      query: ''
    };

    this.onColumnChange = this.onColumnChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  componentDidMount() {
    this.props.onChange({
      [this.state.column]: this.state.query
    });
  }
  render() {
    const {
      onChange, columns, rows, i18n, ...props
    } = this.props;

    return (
      <div {...props}>
        <SearchOptions
          onChange={this.onColumnChange} value={this.state.column}
          columns={columns} i18n={i18n}
        />
        <input onChange={this.onQueryChange} value={this.state.query} />
      </div>
    );
  }
  onColumnChange(event) {
    const column = event.target.value;
    const query = this.state.query;

    this.setState({ column });
    this.props.onChange({
      [column]: query
    });
  }
  onQueryChange(event) {
    const column = this.state.column;
    const query = event.target.value;

    this.setState({ query });
    this.props.onChange({
      [column]: query
    });
  }
}
Search.propTypes = {
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  })
};
Search.defaultProps = {
  columns: [],
  rows: [],
  onChange: () => {},
  i18n: {
    all: 'All'
  }
};

const SearchOptions = ({ columns, i18n, ...props }) => (
  <select {...props}>{
    getOptions(columns, i18n).map(({ name, value }) =>
      <option key={`${value}-option`} value={value}>{name}</option>
    )
  }</select>
);
SearchOptions.propTypes = {
  columns: React.PropTypes.array,
  i18n: React.PropTypes.object
};

const getOptions = (columns, i18n) => (
  (columns.length > 1 ? [{
    value: 'all',
    name: i18n.all
  }] : []).concat(columns.map(column => {
    if (
      (column.cell && column.cell.property) &&
      (column.header && column.header.label)
    ) {
      return {
        value: column.cell.property,
        name: column.header.label
      };
    }

    return null;
  }).filter(column => column))
);

<Search columns={columns} rows={rows} />
```

## See Also

* [Sort and Search](reactabular.js.org/#/examples/sort-and-search)
