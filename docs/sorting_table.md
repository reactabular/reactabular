# Sorting a Table

Reactabular comes with helpers to make sorting easier right out of the box.

The general workflow is as follows:

1. Set up the sort behavior. Its purpose is to track when the user requests sorting and render possibly matching sorting condition as a class for styling.
2. Set up a sort helper. There are helpers for sorting per one column and one for sorting per multiple columns. The helpers handle managing sorting conditions and actual sorting. If you have a back-end, you can skip the latter.
3. Sort the data before rendering.
4. Feed the sorted data to a `Table`.

## Example

```jsx
...
import orderBy from 'lodash/orderBy';
import { behaviors, sort, Table } from 'reactabular';

const sorter = sort.byColumns; // sort.byColumn would work too

...

class DemoTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = behaviors.sort.bind(
      null,
      {
        // Point the behavior to your data. React state can work for this purpose
        // but you can use a state manager as well.
        getSortingColumns: () => this.state.sortingColumns || [],
        //
        onSort: column => {
          // The user requested sorting, adjust the sorting state accordingly.
          // This is a good chance to pass the request through a sorter.
          this.setState({
            sortingColumns: sorter(
              this.state.sortingColumns, column
            ),
          });
        },
      }
    );

    this.state = {
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          property: 'position',
          header: sortable('Position')
        },
        ...
      ],
      data: [...]
      ...
    };
  }
  render() {
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sorter.sort(
      data,
      sortingColumns,
      orderBy
    );

    return (
      <Table columns={columns} data={sortedData}>
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    );
  }
}
```

You can get something basic styles (e.g. UP/DOWN arrows) by importing `./style.css`. In Webpack you can import it to your project using `require('reactabular/style.css')` provided you have appropriate loaders set up.
