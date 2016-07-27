import ReactDOM from 'react-dom';
import React from 'react';
import {
  Table, Sticky, sort, resizableColumn, resolve, highlight, search
} from 'reactabular';
import { compose } from 'redux';
import uuid from 'uuid';
import * as stylesheet from 'stylesheet-helpers';
import orderBy from 'lodash/orderBy';

export default class EasyTable extends React.Component {
  constructor(props) {
    super(props);

    // Generate a unique id for the instance so we
    // don't get clashing class names for resizing.
    this.id = uuid.v4();

    this.state = {
      sortingColumns: null,
      originalColumns: props.columns,
      columns: this.bindColumns(props.columns),
      rows: props.rows
    };

    this.bindColumns = this.bindColumns.bind(this);

    // References to header/body elements so they can be
    // kept in sync while scrolling.
    this.tableHeader = null;
    this.tableBody = null;

    // Custom stylesheet maintained for performance purposes.
    //
    // This can fail on old IE due to low maximum stylesheet limit.
    this.styleSheetElement = null;
    this.styleSheet = null;
  }
  componentDidMount() {
    const { styleSheetElement, styleSheet } = stylesheet.create();

    this.styleSheetElement = styleSheetElement;
    this.styleSheet = styleSheet;

    this.initializeStyles(this.state.columns);
  }
  componentWillUnmount() {
    this.styleSheetElement.remove();
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.originalColumns !== nextProps.columns) {
      this.setState({
        originalColumns: nextProps.columns,
        columns: this.bindColumns(nextProps.columns)
      });

      this.initializeStyles(nextProps.columns);
    }

    if (this.state.rows !== nextProps.rows) {
      this.setState({
        rows: nextProps.rows
      });
    }
  }
  render() {
    const { rowKey, query, tableWidth, tableHeight } = this.props;
    const { columns, sortingColumns } = this.state;
    const rows = compose(
      sort.sorter(
        { columns, sortingColumns, sort: orderBy }
      ),
      highlight.highlighter({ columns, matches: search.matches, query }),
      search.multipleColumns({ columns, query }),
      resolve.resolve({
        columns,
        method: (row, column) => resolve.byFunction('cell.resolve')(
          resolve.nested(row, column),
          column
        )
      })
    )(this.state.rows);
    const tableHeaderWidth = this.tableHeader && this.tableHeader.scrollWidth;
    const tableBodyWidth = this.tableBody && this.tableBody.scrollWidth;
    const scrollOffset = tableHeaderWidth - tableBodyWidth;

    return (
      <Table.Provider columns={columns} style={{ width: tableWidth }}>
        <Sticky.Header
          style={{
            maxWidth: tableWidth
          }}
          ref={tableHeader => {
            if (tableHeader) {
              this.tableHeader = ReactDOM.findDOMNode(tableHeader);
            }
          }}
          tableBody={this.tableBody}
        />

        <Sticky.Body
          rows={rows}
          rowKey={rowKey}
          style={{
            paddingRight: scrollOffset,
            maxWidth: tableWidth,
            maxHeight: tableHeight
          }}
          ref={tableBody => {
            if (tableBody) {
              this.tableBody = ReactDOM.findDOMNode(tableBody);
            }
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
  initializeStyles(columns) {
    columns.forEach((column, i) => (
      stylesheet.updateProperties(
        this.styleSheet,
        getColumnClassName(this.id, i),
        {
          width: `${column.width}px`,
          minWidth: `${column.width}px`
        }
      )
    ));
  }
  bindColumns(columns) {
    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        // Update the width of the changed column class
        stylesheet.updateProperties(
          this.styleSheet,
          getColumnClassName(this.id, columnIndex),
          {
            width: `${width}px`,
            minWidth: `${width}px`
          }
        );
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

    return columns.map((column, i) => {
      if (column.header && column.cell && column.cell.property) {
        const existingHeaderFormat = column.header.format || (v => v);
        const existingHeaderTransforms = column.header.transforms || [];
        const existingCellFormat = column.cell.format || (v => v);
        let newHeaderFormat = existingHeaderFormat;
        let newHeaderTransforms = existingHeaderTransforms;
        let newCellFormat = existingCellFormat;

        if (column.header.sortable && column.header.resizable) {
          newHeaderFormat = (v, extra) => resizable(
            <div>
              <span>{existingHeaderFormat(v, extra)}</span>
              {React.createElement(
                'span',
                sortable(null, extra)
              )}
            </div>,
            extra
          );
        } else if (column.header.sortable) {
          newHeaderTransforms = existingHeaderTransforms.concat([sortable]);
        } else if (column.header.resizable) {
          newHeaderFormat = (v, extra) => resizable(
            existingHeaderFormat(v, extra),
            extra
          );
        }

        if (column.cell.highlight) {
          newCellFormat = (v, extra) => highlight.cell(
            existingCellFormat(v, extra),
            extra
          );
        }

        return {
          ...column,
          props: {
            ...column.props,
            // XXX: it would be better to merge instead. Now
            // we lose possible custom classnames here
            className: getColumnClassName(this.id, i)
          },
          header: {
            ...column.header,
            transforms: newHeaderTransforms,
            format: newHeaderFormat
          },
          cell: {
            ...column.cell,
            format: newCellFormat
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
  rowKey: React.PropTypes.string.isRequired,
  query: React.PropTypes.object,
  tableWidth: React.PropTypes.number.isRequired,
  tableHeight: React.PropTypes.number.isRequired
};

function getColumnClassName(id, i) {
  return `column-${id}-${i}`;
}
