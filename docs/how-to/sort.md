Reactabular comes with sorting helpers. The general workflow is as follows:

1. Set up the sort transform. Its purpose is to track when the user requests sorting and render possibly matching sorting condition as a class for styling.
2. Set up a sort helper. There are helpers for sorting per one column and one for sorting per multiple columns. The helpers handle managing sorting conditions and actual sorting. If you have a back-end, you can skip the latter.
3. Sort the data before rendering.
4. Feed the sorted data to a `Table`.

```react
<SortTable />
```

```code
lang: jsx
---
import React from 'react';
import { Table, sort, transforms } from 'reactabular';

const sorter = sort.byColumns; // sort.byColumn would work too

class SortTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || [],

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: column => {
        this.setState({
          sortingColumns: sorter(
            this.state.sortingColumns, column
          ),
        });
      },
    });

    this.state = {
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          header: {
            label: 'Name',
            transform: sortable('name'),
          },
          cell: {
            property: 'name',
          },
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
        },
        {
          id: 101,
          name: 'Brian',
        },
        {
          id: 102,
          name: 'Jake',
        },
        {
          id: 103,
          name: 'Jill',
        },
      ],
    };
  }
  render() {
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sort.sorter(
      data,
      sortingColumns,
      orderBy
    );

    return (
      <div>
        <Table columns={columns} data={sortedData}>
          <Table.Header />

          <Table.Body rowKey="id" />
        </Table>
      </div>
    );
  }
}
```
