Matching search results can be be Highlighted using a specific `highlight` formatter.

```react
<HighlightTable />
```

```
class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    const highlight = column => formatters.highlight(value => {
      const { searchQuery } = this.state;

      return search.matches(
        column,
        value,
        searchQuery[Object.keys(searchQuery).pop()]
      );
    });

    this.state = {
      searchQuery: {},
      columns: [
        {
          header: {
            value: 'Name',
          },
          cell: {
            property: 'name',
            format: highlight('name'),
          },
        },
        {
          header: {
            value: 'Age',
          },
          cell: {
            property: 'age',
            format: highlight('name'),
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