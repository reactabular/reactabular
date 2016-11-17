import React from 'react';
import {
  Table, Sticky, sort, resizableColumn, resolve, highlight, search
} from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as tree from 'reactabular-tree';
import { mergeClassNames } from 'reactabular-utils';
import { byArrowKeys } from 'reactabular-select';
import * as Virtualized from 'reactabular-virtualized';
import { compose } from 'redux';
import select from 'selectabular';
import findIndex from 'lodash/findIndex';
import { defaultProps, propTypes } from './types';

class EasyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: {}
    };

    this.bindColumns = this.bindColumns.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.onRow = this.onRow.bind(this);
  }
  render() {
    const {
      rowKey, query, headerExtra, sortingColumns,
      tableWidth, tableHeight, components, scroll,
      idField, parentField, classNames,
      onScroll, onRow // eslint-disable-line no-unused-vars
    } = this.props;
    const tableComponents = {
      ...components,
      body: {
        wrapper: Virtualized.BodyWrapper,
        row: dnd.draggableRow(Virtualized.BodyRow)
      }
    };
    const { selectedRow } = this.state;
    const columns = this.bindColumns(this.props);

    if (hasDraggableHeaders(columns)) {
      tableComponents.header = {
        cell: dnd.Header
      };
    }

    // Escape early if there are no columns to display
    if (!columns.length) {
      return null;
    }

    const rows = compose(
      tree.filter({ fieldName: 'showingChildren', parentField }),
      tree.sort({
        columns,
        idField,
        sortingColumns,
        strategy: sort.strategies.byProperty
      }),
      highlight.highlighter({ columns, matches: search.matches, query }),
      tree.search({ columns, query, idField, parentField }),
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
    )(this.props.rows);
    const selectedRowIndex = getSelectedRowIndex({
      rows: this.props.rows,
      rowKey: this.props.rowKey,
      selectedRow
    });

    return byArrowKeys({
      rows,
      selectedRowIndex,
      onSelectRow: this.selectRow
    })(
      <Sticky.Provider
        className={classNames.table && classNames.table.wrapper}
        components={tableComponents}
        columns={columns}
        style={{ width: tableWidth }}
        onScroll={onScroll}
      >
        <Sticky.Header
          className={classNames.header && classNames.header.wrapper}
          style={{
            maxWidth: tableWidth
          }}
          scroll={scroll}
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
          scroll={scroll}
        />
      </Sticky.Provider>
    );
  }
  bindColumns({ columns, props }) {
    const resizable = resizableColumn({
      onDrag: this.props.onDragColumn,
      props: props.resize,
      parent: this.props.window
    });

    const getSortingColumns = () => this.props.sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: (selectedColumn) => {
        const sortingColumns = sort.byColumns({
          sortingColumns: this.props.sortingColumns,
          selectedColumn
        });

        this.props.onSort(sortingColumns);
      },
      strategy: sort.strategies.byProperty,
      props: props.sort
    });
    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      strategy: sort.strategies.byProperty,
      onReset: ({ sortingColumns }) => this.props.onSort(sortingColumns)
    });

    return columns.map(
      column => this.bindColumn({
        column,
        sortable,
        getSortingColumns,
        resetable,
        resizable
      })
    );
  }
  bindColumn({ column, sortable, getSortingColumns, resetable, resizable }) {
    if (column.header || column.cell) {
      const props = column.props || {};
      const header = column.header || {};
      const cell = column.cell || {};
      const existingHeaderProps = header.props;
      const existingHeaderFormat = header.format || (v => v);
      const existingHeaderTransforms = header.transforms || [];
      const existingCellFormat = cell.format || (v => v);
      const newCellFormats = [existingCellFormat];
      const newHeaderFormats = [existingHeaderFormat];
      let newHeaderProps = existingHeaderProps;
      let newHeaderTransforms = existingHeaderTransforms;
      let newStyle = {};

      if (header.sortable) {
        newHeaderFormats.push(sort.header({
          sortable,
          getSortingColumns,
          strategy: sort.strategies.byProperty
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
          onMove: (labels) => {
            const {
              source,
              target,
              columns
            } = dnd.moveLabels(this.props.columns, labels);

            const tmpWidth = source.width;
            source.width = target.width;
            target.width = tmpWidth;

            this.props.onMoveColumns({
              source,
              target,
              columns
            });
          }
        };
      }

      if (cell.highlight) {
        newCellFormats.push((v, extra) => highlight.cell(
          existingCellFormat(v, extra),
          extra
        ));
      }

      if (cell.toggleChildren) {
        newCellFormats.push(tree.toggleChildren({
          getRows: () => this.props.rows,
          getShowingChildren: ({ rowData }) => rowData.showingChildren,
          toggleShowingChildren: this.props.onToggleShowingChildren,
          // Without this it will perform checks against default id
          idField: this.props.idField,
          parentField: this.props.parentField,
          props: this.props.toggleChildrenProps
        }));
      }

      const newCellFormat = (value, extra) => (
        newCellFormats.reduce((parameters, format) => (
          {
            value: format(parameters.value, parameters.extra),
            extra
          }
        ), { value, extra }).value
      );

      const newHeaderFormat = (value, extra) => (
        newHeaderFormats.reduce((parameters, format) => (
          {
            value: format(parameters.value, parameters.extra),
            extra
          }
        ), { value, extra }).value
      );

      if (column.width) {
        newStyle = {
          width: column.width,
          minWidth: column.width
        };
      }

      return {
        ...column,
        props: {
          ...props,
          style: {
            ...props.style,
            ...newStyle
          }
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
  }
  onRow(row, { rowIndex, rowKey }) {
    const { idField, onRow, onMoveRow } = this.props;
    const { className, ...props } = onRow(row, { rowIndex, rowKey });

    const ret = {
      rowId: row[idField],
      onClick: () => this.selectRow(rowIndex),
      onMove: onMoveRow,
      ...props
    };

    const cls = mergeClassNames(className, row.selected && 'selected-row');

    if (cls) {
      ret.className = cls;
    }

    return ret;
  }
  selectRow(selectedRowIndex) {
    const { rowKey, rows } = this.props;
    const selectedRowId = rows[selectedRowIndex][rowKey];
    const result = compose(
      select.rows(row => row[rowKey] === selectedRowId),
      select.none
    )(rows);
    const selectedRow = result.selectedRows[0];

    this.props.onSelectRow({
      selectedRowId: selectedRow && selectedRow[rowKey],
      selectedRow
    });

    this.setState({
      rows: result.rows,
      selectedRow
    });
  }
}
EasyTable.propTypes = propTypes;
EasyTable.defaultProps = defaultProps;

function hasDraggableHeaders(columns) {
  return columns.some(column => column.header && column.header.draggable);
}

function getSelectedRowIndex({ rows, selectedRow, rowKey }) {
  return findIndex(rows, {
    [rowKey]: selectedRow[rowKey]
  });
}

export default EasyTable;
