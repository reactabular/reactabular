import React from 'react';
import PropTypes from 'prop-types';

const arrayOfObjectColumns = PropTypes.arrayOf(PropTypes.shape({
  headerCell: PropTypes.element,
  bodyCell: PropTypes.element
}));
const arrayOfArrayColumns = PropTypes.arrayOf(PropTypes.array);
const rowsType = PropTypes.oneOfType([
  arrayOfObjectColumns,
  arrayOfArrayColumns
]);
const rowKeyType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string
]);
const rowDataType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
]);
const tableTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object
};
const tableContextTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object
};
const tableBodyDefaults = {
  onRow: () => {}
};
const tableBodyTypes = {
  onRow: PropTypes.func,
  rows: rowsType.isRequired,
  rowKey: rowKeyType
};
const tableBodyContextTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object
};
const tableBodyRowDefaults = {
  onRow: () => ({})
};
const tableBodyRowTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object,
  onRow: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  rowData: rowDataType.isRequired,
  rowKey: PropTypes.string.isRequired
};
const tableHeaderTypes = {
  headerRows: PropTypes.arrayOf(arrayOfObjectColumns),
  children: PropTypes.any
};
const tableHeaderContextTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object
};
const tableHeaderRowDefaults = {
  onRow: () => ({})
};
const tableHeaderRowTypes = {
  renderers: PropTypes.object,
  onRow: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  rowData: rowDataType.isRequired
};
const tableDefaults = {
  renderers: {
    table: 'table',
    header: {
      wrapper: 'thead',
      row: 'tr',
      cell: value => <th>{value}</th> // XXX: good idea?
    },
    body: {
      wrapper: 'tbody',
      row: 'tr',
      cell: value => <td>{value}</td> // XXX: good idea?
    }
  }
};

export {
  tableTypes,
  tableContextTypes,
  tableBodyTypes,
  tableBodyDefaults,
  tableBodyContextTypes,
  tableBodyRowTypes,
  tableBodyRowDefaults,
  tableHeaderTypes,
  tableHeaderContextTypes,
  tableHeaderRowTypes,
  tableHeaderRowDefaults,
  tableDefaults
};
