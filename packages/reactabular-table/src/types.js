import PropTypes from 'prop-types';

const arrayOfObjectColumns = PropTypes.arrayOf(
  PropTypes.shape({
    header: PropTypes.shape({
      label: PropTypes.string,
      transforms: PropTypes.arrayOf(PropTypes.func),
      formatters: PropTypes.arrayOf(PropTypes.func),
      props: PropTypes.object
    }),
    cell: PropTypes.shape({
      property: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      transforms: PropTypes.arrayOf(PropTypes.func),
      formatters: PropTypes.arrayOf(PropTypes.func),
      props: PropTypes.object
    })
  })
);
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
  components: PropTypes.object
};
const tableContextTypes = {
  columns: PropTypes.array.isRequired,
  components: PropTypes.object
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
  components: PropTypes.object
};
const tableBodyRowDefaults = {
  onRow: () => ({})
};
const tableBodyRowTypes = {
  columns: PropTypes.array.isRequired,
  components: PropTypes.object,
  onRow: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  rowData: rowDataType.isRequired,
  rowKey: PropTypes.string.isRequired
};
const tableHeaderTypes = {
  headerRows: PropTypes.arrayOf(
    arrayOfObjectColumns
  ),
  children: PropTypes.any
};
const tableHeaderContextTypes = {
  columns: PropTypes.array.isRequired,
  components: PropTypes.object
};
const tableHeaderRowDefaults = {
  onRow: () => ({})
};
const tableHeaderRowTypes = {
  components: PropTypes.object,
  onRow: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  rowData: rowDataType.isRequired
};
const tableDefaults = {
  components: {
    table: 'table',
    header: {
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    },
    body: {
      wrapper: 'tbody',
      row: 'tr',
      cell: 'td'
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
