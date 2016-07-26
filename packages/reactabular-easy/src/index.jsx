import React from 'react';
import { Table, sort, resizableColumn } from 'reactabular';
// import * as search from 'reactabular-search';
// import * as edit from 'reactabular-edit';
// import * as highlight from 'reactabular-highlight';
// import * as resolve from 'reactabular-resolve';
import orderBy from 'lodash/orderBy';

export default class EasyTable extends React.Component {
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
      <Table.Provider columns={columns}>
        <Table.Header />

        <Table.Body rows={rows} rowKey={rowKey} />
      </Table.Provider>
    );
  }
  bindColumns(columns) {
    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const stateColumns = this.state.columns;
        const column = stateColumns[columnIndex];

        // XXX: mutates. better to cloneDeep or rewrite
        column.props.style = {
          ...column.props.style,
          width
        };

        this.setState({
          columns: stateColumns
        });
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
        } else if (column.header.sortable) {
          newTransforms = existingTransforms.concat([sortable]);
        } else if (column.header.resizable) {
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
EasyTable.propTypes = {
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired
};
