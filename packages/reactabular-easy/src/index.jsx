import React from 'react';
import {
  Table, Sticky, sort, resizableColumn, resolve, highlight, search, select
} from 'reactabular';
import { mergeClassNames } from 'reactabular-utils';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import uuid from 'uuid';
import * as stylesheet from 'stylesheet-helpers';
import findIndex from 'lodash/findIndex';
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
      rows: props.rows,
      selectedRow: {}
    };

    this.bindColumns = this.bindColumns.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.onFinishMove = this.onFinishMove.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onRow = this.onRow.bind(this);
    this.getSelectedRowIndex = this.getSelectedRowIndex.bind(this);

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
    }

    if (this.state.rows !== nextProps.rows) {
      this.setState({
        rows: nextProps.rows
      });
    }
  }
  render() {
    const components = {
      header: {
        cell: DndHeader
      }
    };
    const {
      rowKey, query,
      tableWidth, tableHeight,
      classNames, onRow // eslint-disable-line no-unused-vars
    } = this.props;
    const { columns, selectedRow, sortingColumns } = this.state;
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
    const tableHeaderWidth = this.tableHeader ? this.tableHeader.scrollWidth : 0;
    const tableBodyWidth = this.tableBody ? this.tableBody.scrollWidth : 0;
    const scrollOffset = tableHeaderWidth - tableBodyWidth;
    const selectedRowIndex = this.getSelectedRowIndex(selectedRow);

    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.selectRow
    })(
      <Table.Provider
        className={classNames.table && classNames.table.wrapper}
        components={components}
        columns={columns}
        style={{ width: tableWidth }}
      >
        <Sticky.Header
          className={classNames.header && classNames.header.wrapper}
          style={{
            maxWidth: tableWidth
          }}
          ref={tableHeader => {
            this.tableHeader = tableHeader && tableHeader.getRef();
          }}
          tableBody={this.tableBody}
        />

        <Sticky.Body
          className={classNames.body && classNames.body.wrapper}
          rows={rows}
          rowKey={rowKey}
          onRow={this.onRow}
          style={{
            paddingRight: scrollOffset,
            maxWidth: tableWidth,
            maxHeight: tableHeight
          }}
          ref={tableBody => {
            this.tableBody = tableBody && tableBody.getRef();
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

        this.props.onDragColumn(width, columnIndex);
      }
    });

    const getSortingColumns = () => this.state.sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });
    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      onReset: ({ sortingColumns }) => this.setState({ sortingColumns })
    });

    return columns.map((column, i) => {
      if (column.header || column.cell) {
        const props = column.props || {};
        const header = column.header || {};
        const cell = column.cell || {};
        const existingHeaderProps = header.props;
        const existingHeaderFormat = header.format || (v => v);
        const existingHeaderTransforms = header.transforms || [];
        const existingCellFormat = cell.format || (v => v);
        let newHeaderProps = existingHeaderProps;
        let newHeaderFormat = existingHeaderFormat;
        let newHeaderTransforms = existingHeaderTransforms;
        let newCellFormat = existingCellFormat;

        if (header.sortable && header.resizable) {
          newHeaderTransforms = existingHeaderTransforms.concat([resetable]);
          newHeaderFormat = (v, extra) => resizable(sort.header({
            sortable,
            getSortingColumns
          })(existingHeaderFormat(v, extra), extra), extra);
        } else if (header.sortable) {
          newHeaderTransforms = existingHeaderTransforms.concat([resetable]);
          newHeaderFormat = (v, extra) => sort.header({
            sortable,
            getSortingColumns
          })(existingHeaderFormat(v, extra), extra);
        } else if (header.resizable) {
          newHeaderFormat = (v, extra) => resizable(
            existingHeaderFormat(v, extra),
            extra
          );
        }

        if (header.draggable) {
          newHeaderProps = {
            // DnD needs this to tell header cells apart
            label: header.label,
            onFinishMove: o => this.onFinishMove(o),
            onMove: o => this.onMove(o)
          };
        }

        if (cell.highlight) {
          newCellFormat = (v, extra) => highlight.cell(
            existingCellFormat(v, extra),
            extra
          );
        }

        return {
          ...column,
          props: {
            ...props,
            className: mergeClassNames(
              getColumnClassName(this.id, i),
              props && props.className
            )
          },
          header: {
            ...header,
            props: newHeaderProps,
            transforms: newHeaderTransforms,
            format: newHeaderFormat
          },
          cell: {
            ...cell,
            format: newCellFormat
          }
        };
      }

      return column;
    });
  }
  onFinishMove() {
    this.props.onMoveColumns(this.state.columns);
  }
  onMove(labels) {
    // This returns a new instance, no need to cloneDeep.
    const movedColumns = moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.source;
      const target = movedColumns.target;

      const tmpClassName = source.props.className;
      source.props.className = target.props.className;
      target.props.className = tmpClassName;

      this.setState({
        columns: movedColumns.columns
      });
    }

    return movedColumns;
  }
  onRow(row, rowIndex) {
    const { className, ...props } = this.props.onRow(row, rowIndex);

    return {
      className: mergeClassNames(className, row.selected && 'selected-row'),
      onClick: () => this.selectRow(rowIndex),
      ...props
    };
  }
  selectRow(selectedRowIndex) {
    const { selectedRowIdField } = this.props;
    const { rows } = this.state;
    const selected = select.row({
      rows,
      isSelected: (row, selectedRowId) => (
        row[selectedRowIdField] === selectedRowId
      ),
      selectedRowId: rows[selectedRowIndex][selectedRowIdField]
    });

    this.props.onSelectRow({
      selectedRowId: selected.selectedRow[selectedRowIdField],
      selectedRow: selected.selectedRow
    });

    this.setState(selected);
  }
  getSelectedRowIndex(selectedRow) {
    const { selectedRowIdField } = this.props;

    return findIndex(this.state.rows, {
      [selectedRowIdField]: selectedRow[selectedRowIdField]
    });
  }
}
EasyTable.propTypes = {
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired,
  query: React.PropTypes.object,
  tableWidth: React.PropTypes.any.isRequired,
  tableHeight: React.PropTypes.any.isRequired,
  classNames: React.PropTypes.object,
  selectedRowIdField: React.PropTypes.string.isRequired,
  onRow: React.PropTypes.func,
  onDragColumn: React.PropTypes.func,
  onMoveColumns: React.PropTypes.func,
  onSelectRow: React.PropTypes.func
};
EasyTable.defaultProps = {
  classNames: {
    table: null,
    header: {
      wrapper: null
      // TODO
      /*
      row: null,
      cell: null
      */
    },
    body: {
      wrapper: null
      // TODO
      /*
      row: null,
      cell: null
      */
    }
  },
  selectedRowIdField: 'id',
  onRow: () => ({}),
  onDragColumn: () => {},
  onMoveColumns: () => {},
  onSelectRow: () => {}
};

function getColumnClassName(id, i) {
  return `column-${id}-${i}`;
}

function moveLabels(columns, { sourceLabel, targetLabel }) {
  const sourceIndex = findIndex(
    columns,
    { header: { label: sourceLabel } }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    { header: { label: targetLabel } }
  );

  if (targetIndex < 0) {
    return null;
  }

  const movedColumns = move(columns, sourceIndex, targetIndex);

  return {
    source: movedColumns[sourceIndex],
    target: movedColumns[targetIndex],
    columns: movedColumns
  };
}

function move(data, sourceIndex, targetIndex) {
  // Idea
  // a, b, c, d, e -> move(b, d) -> a, c, d, b, e
  // a, b, c, d, e -> move(d, a) -> d, a, b, c, e
  // a, b, c, d, e -> move(a, d) -> b, c, d, a, e
  const sourceItem = data[sourceIndex];

  // 1. detach - a, c, d, e - a, b, c, e, - b, c, d, e
  const ret = data.slice(0, sourceIndex).concat(
    data.slice(sourceIndex + 1)
  );

  // 2. attach - a, c, d, b, e - d, a, b, c, e - b, c, d, a, e
  return ret.slice(0, targetIndex).concat([sourceItem]).concat(
    ret.slice(targetIndex)
  );
}

const DragTypes = {
  HEADER: 'header'
};
const headerSource = {
  beginDrag({ label }) {
    return { label };
  }
};
const headerTarget = {
  hover(targetProps, monitor) {
    const targetLabel = targetProps.label;
    const sourceProps = monitor.getItem();
    const sourceLabel = sourceProps.label;

    if (sourceLabel !== targetLabel && targetProps.onMove) {
      targetProps.onMove({ sourceLabel, targetLabel });
    }
  },
  drop(targetProps) {
    if (targetProps.onFinishMove) {
      targetProps.onFinishMove();
    }
  }
};
const DndHeader = compose(
  DragSource( // eslint-disable-line new-cap
    DragTypes.HEADER, headerSource, connect => ({
      connectDragSource: connect.dragSource()
    })
  ),
  DropTarget( // eslint-disable-line new-cap
    DragTypes.HEADER, headerTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(({
  connectDragSource, connectDropTarget, label, // eslint-disable-line no-unused-vars
  children, onMove, onFinishMove, ...props // eslint-disable-line no-unused-vars
}) => (
  connectDragSource(connectDropTarget(
    <th {...props}>{children}</th>
  ))
));
