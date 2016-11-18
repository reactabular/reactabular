import React from 'react';
import { Table, Sticky } from 'reactabular';
import * as dnd from 'reactabular-dnd';
import { mergeClassNames } from 'reactabular-utils';
import { byArrowKeys } from 'reactabular-select';
import * as Virtualized from 'reactabular-virtualized';
import { compose } from 'redux';
import select from 'selectabular';
import findIndex from 'lodash/findIndex';
import bindColumns from './bind-columns';
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
  }
  componentDidMount() {
    // We have refs now. Force update to get those to Header/Body.
    this.forceUpdate();
  }
  render() {
    const {
      rowKey, query, headerExtra, sortingColumns,
      tableWidth, tableHeight, components,
      idField, parentField,
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
    const columns = bindColumns(this.props);

    if (hasDraggableHeaders(columns)) {
      tableComponents.header = {
        cell: dnd.Header
      };
    }

    // Escape early if there are no columns to display
    if (!columns.length) {
      return null;
    }

    // Partition the problem here - perform most of this on drag start
    // and skip during dragging.
    const rows = processRows({
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

    return byArrowKeys({
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
