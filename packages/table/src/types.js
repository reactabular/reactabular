import React from 'react';
import PropTypes from 'prop-types';

const arrayOfObjectColumns = PropTypes.arrayOf(PropTypes.shape({
  headerCell: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  bodyCell: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
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
const tableBodyDefaults = {};
const tableBodyTypes = {
  rows: rowsType.isRequired,
  rowKey: rowKeyType
};
const tableBodyContextTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object
};
const tableBodyRowDefaults = {};
const tableBodyRowTypes = {
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object,
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
const tableHeaderRowDefaults = {};
const tableHeaderRowTypes = {
  renderers: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
  rowData: rowDataType.isRequired
};
const renderer = type => ({
  // eslint-disable-next-line no-shadow, no-unused-vars
  children, columnIndex, renderer, rowData, rowIndex, props
} = {}) => (
  React.createElement(type, props, children)
);
const tableDefaults = {
  renderers: {
    table: renderer('table'),
    header: {
      wrapper: 'thead',
      row: renderer('tr'),
      cell: renderer('th')
    },
    body: {
      wrapper: 'tbody',
      row: renderer('tr'),
      cell: renderer('td')
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
