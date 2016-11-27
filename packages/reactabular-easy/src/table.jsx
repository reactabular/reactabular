import React from 'react';
import classnames from 'classnames';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as dnd from 'reactabular-dnd';
import * as Virtualized from 'reactabular-virtualized';
import { compose } from 'redux';
import * as select from 'selectabular';
import { findIndex, values } from 'lodash';
import processRows from './process-rows';
import { defaultProps, propTypes } from './types';

class EasyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: {}
    };

    this.selectRow = this.selectRow.bind(this);
    this.onRow = this.onRow.bind(this);

    // References to header/body elements so they can be
    // kept in sync while scrolling.
    this.tableHeader = null;
    this.tableBody = null;

    // Drag and drop for rows
    this.onCanMoveRow = this.onCanMoveRow.bind(this);
    this.onMoveRowStart = this.onMoveRowStart.bind(this);
    this.onMoveRowEnd = this.onMoveRowEnd.bind(this);
    this.movingRow = false;
  }
  componentDidMount() {
    // We have refs now. Force update to get those to Header/Body.
    this.forceUpdate();
  }
  render() {
    const {
      rowKey, query, headerExtra, sortingColumns,
      tableWidth, tableHeight, components,
      idField, parentField, headerRows,
      columns,
      classNames, onRow // eslint-disable-line no-unused-vars
    } = this.props;
    const tableComponents = {
      ...components,
      body: {
        wrapper: Virtualized.BodyWrapper,
        row: dnd.draggableRow(Virtualized.BodyRow)
      }
    };
    const { selectedRow } = this.state;

    if (hasDraggableHeaders(columns)) {
      tableComponents.header = {
        cell: dnd.Header
      };
    }

    // Escape early if there are no columns to display
    if (!columns.length) {
      return null;
    }

    const rows = processRows({
      movingRow: this.movingRow,
      query,
      sortingColumns,
      idField,
      parentField,
      columns
    })(this.props.rows);
    const selectedRowIndex = getSelectedRowIndex({
      rows: this.props.rows,
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
          headerRows={headerRows}
          className={classNames.header && classNames.header.wrapper}
          style={{
            maxWidth: tableWidth
          }}
          ref={(tableHeader) => {
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
          ref={(tableBody) => {
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
  onRow(row, { rowIndex, rowKey }) {
    const { idField, onRow, onMoveRow } = this.props;
    const { className, ...props } = onRow(row, { rowIndex, rowKey });

    const ret = {
      rowId: row[idField],
      onClick: () => this.selectRow(rowIndex),
      onMove: onMoveRow,
      onCanMove: this.onCanMoveRow,
      onMoveStart: this.onMoveRowStart,
      onMoveEnd: this.onMoveRowEnd,
      ...props
    };

    const cls = classnames(className, row.selected && 'selected-row');

    if (cls) {
      ret.className = cls;
    }

    return ret;
  }
  onCanMoveRow() {
    const { query, sortingColumns } = this.props;

    return (
      values(query).filter(id).length === 0 &&
      values(sortingColumns).filter(id).length === 0
    );
  }
  onMoveRowStart() {
    this.movingRow = true;
  }
  onMoveRowEnd() {
    this.movingRow = false;

    // Done, force update to skip optimization and sort again
    this.forceUpdate();
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

function id(a) {
  return a;
}

export default EasyTable;
