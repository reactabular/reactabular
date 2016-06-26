Reactabular comes with search helpers. It consists of search algorithms that can be applied to the data. Just like with sorting, you have to apply it to the data just before rendering. A column is considered searchable in case it has a unique `property` defined.

```react
<SearchTable />
```

```code
lang: jsx
---
import React from 'react';
import { Table, search } from 'reactabular';
import { Search } from './helpers';

class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {},
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
      data: [
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
    const { data, columns, query } = this.state;
    let searchedData = search.multipleColumns({ data, columns, query });

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table columns={columns} data={searchedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table>
      </div>
    );
  }
}
```

> You can find that `Search` helper from `docs/helpers`. It's not included in the core distribution.

## API

The Search API consists of three parts. Out of these `search.multipleColumns` and `search.matches` are the most useful ones for normal usage. If the default search strategies aren't enough, it's possible to implement more as long as you follow the same interface.

### Search

**`search.multipleColumns({ data: [<object>], columns: [<object>], query: {<column>: <query>}, strategy: <strategy>, transform: <transform> }) => [<data>]`**

This is the highest level search function available. It expects `data` and `columns` in the same format the `Table` uses. `query` object describes column specific search queries.

It uses `infix` strategy underneath although it is possible to change it. By default it matches in a case **insensitive** manner. If you want case sensitive behavior, pass `a => a`(identity function) as `transform`.

**`search.singleColumn({ data: [<object>], columns: [<object>], searchColumn: <string>, query: <string>, strategy: <strategy>, transform: <transform> }) => [<data>]`**

This is a more specialized version of `search.multipleColumns`. You can use it to search a specific column through `searchColumn` and `query`.

### Matchers

**`search._columnMatches({ data: [<object>], column: [<object>], row: <object>, strategy: <strategy>, transform: <transform> }) => <boolean>`**

This is a function that can be used to figure out all column specific matches. It is meant only for **internal usage** of the library.

**`search.matches({ value: <string>, query: <string>, strategy: <strategy>, transform: <transform> }) => [{ startIndex: <number>, length: <number> }]`**

This function returns matches against the given value and query. This is particularly useful with the `highlight` formatter.

### Strategies

**`search.strategies.infix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]}`**

Search uses `infix` strategy by default. This means it will match even if the result is in the middle of a `searchText`.

The strategies operate in two passes - evaluation and matching. The evaluation pass allows us to implement perform fast boolean check on whether or not a search will match. Matching gives exact results.

**`search.strategies.prefix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]}`**

`prefix` strategy matches from the start.
