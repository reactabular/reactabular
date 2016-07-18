This demonstration shows how to implement a stateful wrapper on top of Reactabular. The technique is handy if you want to wrap boilerplate and push abstraction level of the column definition higher.

```jsx
/*
import React from 'react';
import orderBy from 'lodash/orderBy';
import { Table, sort } from 'reactabular';
import { resizableColumn } from './helpers';
*/

const rows = [
  {
    id: 100,
    name: 'Adam',
    dad: 'John',
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: 'George',
    lovesBeeGees: false
  },
  {
    id: 102,
    name: 'Jake',
    dad: 'George',
    lovesBeeGees: false
  },
  {
    id: 103,
    name: 'Bob',
    dad: 'George',
    lovesBeeGees: true
  }
];

const columns = [
  {
    header: {
      label: 'Name',
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'name'
    },
    props: {
      style: {
        width: 200
      }
    }
  },
  {
    header: {
      label: 'Dad',
      sortable: true
    },
    cell: {
      property: 'dad'
    }
  }
];

class StatefulTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortingColumns: null,
      originalColumns: props.columns,
      columns: this.bindColumns(props.columns),
      rows: props.rows
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

    if (this.state.rows !== nextProps.rows) {
      this.setState({
        rows: nextProps.rows
      });
    }
  }
  render() {
    const { rowKey } = this.props;
    const { columns, sortingColumns } = this.state;
    const rows = sort.sorter(
      { columns, sortingColumns, sort: orderBy }
    )(this.state.rows);

    return (
      <div>
        <Table.Provider columns={columns}>
          <Table.Header />

          <Table.Body rows={rows} rowKey={rowKey} />
        </Table.Provider>
      </div>
    );
  }
  bindColumns(columns) {
    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.props.style = {
          ...column.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    const sortable = sort.sort({
      // Point the transform to your rows. React state can work for this purpose
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
      if (column.header && column.cell && column.cell.property) {
        const existingFormat = column.header.format || (v => v);
        const existingTransforms = column.header.transforms || [];
        let newFormat = existingFormat;
        let newTransforms = existingTransforms;

        if (column.header.sortable && column.header.resizable) {
          newFormat = (v, extra) => resizable(
            <div>
              <span>{existingFormat(v, extra)}</span>
              {React.createElement(
                'span',
                sortable(null, extra)
              )}
            </div>,
            extra
          );
        }
        else if (column.header.sortable) {
          newTransforms = existingTransforms.concat([sortable]);
        }
        else if (column.header.resizable) {
          newFormat = (v, extra) => resizable(
            existingFormat(v, extra),
            extra
          );
        }

        return {
          ...column,
          header: {
            ...column.header,
            format: newFormat,
            transforms: newTransforms
          }
        };
      }

      return column;
    });
  }
}
StatefulTable.propTypes = {
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired
};

<StatefulTable rows={rows} columns={columns} rowKey="id" />
```
