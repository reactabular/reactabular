Reactabular comes with a search helper. It consists of a `Search` component and a search algorithm that can be applied to the data. Just like with sorting, you have to apply the algorithm to the data just before rendering. If you were sorting the data as well, you would probably want to apply the search algorithm before sorting.

A column is considered searchable in case it has a unique `property` defined. It is possible to customize `Search` component further by passing a `i18n` prop to it (`{`<Search i18n={{all: 'Kaikki'}} ... />`}`).

```react
<SearchTable />
```

```
class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: {},
      columns: [
        {
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
          },
        },
        {
          header: {
            value: 'Age',
          },
          cell: {
            property: 'age',
          },
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 12,
        },
        {
          id: 101,
          name: 'Brian',
          age: 7,
        },
        {
          id: 102,
          name: 'Jake',
          age: 88,
        },
        {
          id: 103,
          name: 'Jill',
          age: 50,
        },
      ],
    };
  }
  render() {
    const { data, columns, searchQuery } = this.state;
    let searchedData = search(data, columns, searchQuery);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={searchQuery => this.setState({ searchQuery })}
          />
        </div>
        <Table columns={columns} data={searchedData}>
          <Table.Header />

          <Table.Body rowKey="id" />
        </Table>
      </div>
    );
  }
}
```