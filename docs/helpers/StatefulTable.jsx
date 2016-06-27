import React from 'react';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms
} from '../../src';

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
  // TODO: test this somehow to make sure the checks work
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
    const sortedData = sort.sorter({ data, sortingColumns, sort: orderBy });

    return (
      <div>
        <Table columns={columns} data={sortedData} rowKey={rowKey}>
          <Table.Header />

          <Table.Body />
        </Table>
      </div>
    );
  }
  bindColumns(columns) {
    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || [],

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
            transform: (v, extra) => (
              existingTransform(sortable(column.cell.property)(v, extra), extra)
            )
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
