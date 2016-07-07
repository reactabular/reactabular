This demonstration shows how to implement a stateful wrapper on top of Reactabular. The technique is handy if you want to wrap boilerplate and push abstraction level of the column definition higher.

```react
const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John'
    },
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: false
  },
  {
    id: 102,
    name: 'Jake',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: false
  },
  {
    id: 103,
    name: 'Bob',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: true
  }
];

const columns = [
  {
    header: {
      label: 'Name',
      sortable: true
    },
    cell: {
      property: 'name'
    }
  },
  {
    header: {
      label: 'Dad',
      sortable: true
    },
    cell: {
      property: 'dad.name'
    }
  }
];

<StatefulTable data={data} columns={columns} rowKey="id" />
```

```code
lang: jsx
---
import React from 'react';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms
} from 'reactabular';

class StatefulTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortingColumns: null,
      originalColumns: props.columns,
      columns: this.bindColumns(props.columns),
      data: props.data
    };

    this.bindColumns = this.bindColumns.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.originalColumns !== nextProps.columns) {
      this.setState({
        originalColumns: nextProps.columns,
        columns: this.bindColumns(nextProps.columns)
      });
    }

    if (this.state.data !== nextProps.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }
  render() {
    const { rowKey } = this.props;
    const { data, columns, sortingColumns } = this.state;
    const sortedData = sort.sorter({ sortingColumns, sort: orderBy })(data);

    return (
      <div>
        <Table.Provider columns={columns} data={sortedData} rowKey={rowKey}>
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
  bindColumns(columns) {
    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || {},

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });

    return columns.map(column => {
      if (column.header && column.header.sortable &&
        column.cell && column.cell.property) {
        const existingTransform = column.header.transform || (v => v);

        return {
          ...column,
          header: {
            ...column.header,
            transforms: [
              (v, extra) => (
                existingTransform(sortable()(v, extra), extra)
              )
            ]
          }
        };
      }

      return column;
    });
  }
}
StatefulTable.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired
};

export default StatefulTable;
```
