import React from 'react';
import {
  Table, Sticky, sort, resizableColumn, resolve, highlight, search, select
} from 'reactabular';
import * as dnd from 'reactabular-dnd';
import { mergeClassNames } from 'reactabular-utils';
import * as Virtualized from 'reactabular-virtualized';
import { compose } from 'redux';
import uuid from 'uuid';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import { defaultProps, propTypes } from './types';
import {
  createStylesheet, getColumnClassName, initializeStyles, updateWidth,
  getSelectedRowIndex
} from './utils';

class EasyTable extends React.Component {
  constructor(props) {
    super(props);

    // Generate a unique id for the instance so we
    // don't get clashing class names for resizing.
    this.id = uuid.v4();

    this.state = {
      originalColumns: props.columns,
      columns: this.bindColumns(props),
      rows: props.rows,
      selectedRow: {}
    };

    this.bindColumns = this.bindColumns.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onRow = this.onRow.bind(this);

    // References to header/body elements so they can be
    // kept in sync while scrolling.
    this.tableHeader = null;
    this.tableBody = null;

    // Custom stylesheet is maintained for performance purposes.
    //
    // This can fail on old IE due to low maximum stylesheet limit.
    this.styleSheetElement = null;
    this.styleSheet = null;
  }
  componentDidMount() {
    const { styleSheetElement, styleSheet } = createStylesheet(this.props.window.document);

    this.styleSheetElement = styleSheetElement;
    this.styleSheet = styleSheet;

    initializeStyles({
      document: this.props.window.document,
      styleSheet: this.styleSheet,
      columns: this.state.columns,
      id: this.id
    });

    // We have refs now. Force update to get those to Header/Body.
    this.forceUpdate();
  }
  componentWillUnmount() {
    this.styleSheetElement.remove();
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.originalColumns !== nextProps.columns) {
      this.setState({
        originalColumns: nextProps.columns,
        columns: this.bindColumns(nextProps)
      });
    }

    if (this.state.rows !== nextProps.rows) {
      this.setState({
        rows: nextProps.rows
      });
    }
  }
  render() {
    const {
      rowKey, query, headerExtra, sortingColumns,
      tableWidth, tableHeight, components,
      classNames, onRow // eslint-disable-line no-unused-vars
    } = this.props;
    const tableComponents = {
      ...components,
      header: {
        cell: dnd.Header
      },
      body: {
        wrapper: Virtualized.BodyWrapper,
        row: Virtualized.BodyRow
      }
    };
    const { columns, selectedRow } = this.state;

    // Escape early if there are no columns to display
    if (!columns.length) {
      return null;
    }

    const rows = compose(
      sort.sorter(
        {
          columns,
          sortingColumns,
          sort: orderBy,
          getColumn: (columns, property) => find(columns, { property }) // eslint-disable-line no-shadow, max-len
        }
      ),
      highlight.highlighter({ columns, matches: search.matches, query }),
      search.multipleColumns({ columns, query }),
      resolve.resolve({
        columns,
        method: ({ rowData, rowIndex, column }) => resolve.byFunction('cell.resolve')({
          rowData: resolve.nested({
            rowData: resolve.index({ rowData, rowIndex }),
            column
          }),
          column
        })
      })
    )(this.state.rows);
    const selectedRowIndex = getSelectedRowIndex({
      rows: this.state.rows,
      rowKey: this.props.rowKey,
      selectedRow
    });

    return select.byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.selectRow
    })(
      <Table.Provider
        className={classNames.table && classNames.table.wrapper}
        components={tableComponents}
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
        >
          {headerExtra}
        </Sticky.Header>

        <Virtualized.Body
          className={classNames.body && classNames.body.wrapper}
          rows={rows}
          rowKey={rowKey}
          onRow={this.onRow}
          style={{
            maxWidth: tableWidth
          }}
          height={tableHeight}
          ref={tableBody => {
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
  bindColumns({ columns, styles }) {
    const resizable = resizableColumn({
      onDrag: (width, { columnIndex }) => {
        // Update the width of the changed column class
        updateWidth({
          doc: this.props.window.document,
          styleSheet: this.styleSheet,
          id: this.id,
          width,
          columnIndex
        });

        this.props.onDragColumn(width, columnIndex);
      },
      styles: styles.resize,
      parent: this.props.window
    });

    const getSortingColumns = () => this.props.sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        const sortingColumns = sort.byColumns({
          sortingColumns: this.props.sortingColumns,
          selectedColumn
        });

        this.props.onSort(sortingColumns);
      },
      fieldName: 'property',
      styles: styles.sort
    });
    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      fieldName: 'property',
      onReset: ({ sortingColumns }) => this.props.onSort(sortingColumns)
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
        const newHeaderFormats = [existingHeaderFormat];
        let newHeaderProps = existingHeaderProps;
        let newHeaderTransforms = existingHeaderTransforms;
        let newCellFormat = existingCellFormat;

        if (header.sortable) {
          newHeaderFormats.push(sort.header({
            sortable,
            getSortingColumns,
            fieldName: 'property'
          }));
          newHeaderTransforms = newHeaderTransforms.concat([resetable]);
        }

        if (header.resizable) {
          newHeaderFormats.push(resizable);
        }

        if (header.draggable) {
          newHeaderProps = {
            // DnD needs this to tell header cells apart
            label: header.label,
            onFinishMove: () => this.props.onMoveColumns(this.state.columns),
            onMove: o => this.onMove(o)
          };
        }

        if (cell.highlight) {
          newCellFormat = (v, extra) => highlight.cell(
            existingCellFormat(v, extra),
            extra
          );
        }

        const newHeaderFormat = (value, extra) => (
          newHeaderFormats.reduce((parameters, format) => (
            {
              value: format(parameters.value, parameters.extra),
              extra
            }
          ), { value, extra }).value
        );

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
  onMove(labels) {
    // This returns a new instance, no need to cloneDeep.
    const movedColumns = dnd.moveLabels(this.state.columns, labels);

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
    const { rowKey } = this.props;
    const { rows } = this.state;
    const selected = select.row({
      rows,
      isSelected: (row, selectedRowId) => (
        row[rowKey] === selectedRowId
      ),
      selectedRowId: rows[selectedRowIndex][rowKey]
    });

    this.props.onSelectRow({
      selectedRowId: selected.selectedRow[rowKey],
      selectedRow: selected.selectedRow
    });

    this.setState(selected);
  }
}
EasyTable.propTypes = propTypes;
EasyTable.defaultProps = defaultProps;

export default EasyTable;
