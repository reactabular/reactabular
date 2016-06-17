# Searching a Table

Reactabular comes with a search helper. It consists of a component and a search algorithm that can be applied to the data. Just like with sorting, you have to apply the algorithm to the data just before rendering. If you were sorting the data as well, you would probably want to apply the search algorithm before sorting.

## Example

```jsx
import {
  Table, Search,
} from 'reactabular';

class DemoTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortingColumns: null, // reference to the sorting columns
      search: {},
      columns: [
        {
          property: 'position',
          header: 'Position'
        },
        ...
      ],
      data: [...]
      ...
    };

    this.onSearch = this.onSearch.bind(this);
  }
  render() {
    const { data, columns, search } = this.state;
    let searchedData = Search.search(data, columns, search);

    return (
      <div>
        <div className="search-container">
          Search <Search columns={columns} data={data} onChange={onSearch} />
        </div>
        <Table columns={columns} data={searchedData}>
          <Table.Header />

          <Table.Body rowKey="id" />
        </Table>
      </div>
    );
  }
  onSearch(search) {
    this.setState({ search });
  }
}
```

T> If you want to filter per column, see the `FullTable` example at the repository. It contains a `ColumnFilters` component for that particular task.

## Handling the Search Results

A column becomes searchable when it has a unique 'property' property for each column.
In the following example, the __Followers__ and __Tweets__ columns are searchable but __Actions__ is not.

```javascript
var columns = [
  {
    property: 'followers',
    header: 'Followers',
  },
  {
    property: 'tweets',
    header: 'Tweets',
  },
  {
    // This column is NOT searched because it has no 'property' property
    header: 'Actions',
  }
];
```

## i18n

It's possible to i18n `Search` through `i18n` prop. It defaults to English if no translation is provided.

```jsx
<Search i18n={{all: 'Kaikki'}} ... />
```

## Highlighting Search Results

We can highlight individual search results by using a premade `highlight` formatter:

```jsx
import {
  Table, Search, highlighters
} from 'reactabular';

class DemoTable extends React.Component {
  constructor(props) {
    super(props);

    const highlighter = column => formatters.highlight(value => {
      const { search } = this.state;

      return Search.matches(
        column,
        value,
        search[Object.keys(search).pop()]
      );
    });

    this.state = {
      sortingColumns: null, // reference to the sorting columns
      search: {},
      columns: [
        {
          property: 'position',
          header: 'Position',
          cell: highlighter('position')
        },
        ...
      ],
      data: [...]
      ...
    };

    this.onSearch = this.onSearch.bind(this);
  }
  render() {
    const { data, columns, search } = this.state;
    let searchedData = Search.search(data, columns, search);

    return (
      <div>
        <div className="search-container">
          Search <Search columns={columns} data={data} onChange={onSearch} />
        </div>
        <Table columns={columns} data={searchedData}>
          <Table.Header />

          <Table.Body rowKey="id" />
        </Table>
      </div>
    );
  }
  onSearch(search) {
    this.setState({ search });
  }
}
```

We just pipe the formatted cell to `highlight` helper which then figures out what part of the search result hit it, if it hit altogether. If there's a match, it will emit a `span` with `class='highlight'`. For example, if the search term was 'oo' and
the data under evaluation 'noon moon', the following structure would be emitted:

```jsx
<span className='search-result'>
  <span>n</span>
  <span className='highlight'>oo</span>
  <span>n m</span>
  <span className='highlight'>oo</span>
  <span>n</span>
</span>
```
