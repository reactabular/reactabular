import React from 'react';

const arrayOfObjectColumns = React.PropTypes.arrayOf(
  React.PropTypes.shape({
    header: React.PropTypes.shape({
      label: React.PropTypes.string,
      transforms: React.PropTypes.arrayOf(React.PropTypes.func),
      format: React.PropTypes.func,
      props: React.PropTypes.object
    }),
    cell: React.PropTypes.shape({
      property: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      transforms: React.PropTypes.arrayOf(React.PropTypes.func),
      format: React.PropTypes.func,
      props: React.PropTypes.object
    })
  })
);
const arrayOfArrayColumns = React.PropTypes.arrayOf(React.PropTypes.array);
const rowsType = React.PropTypes.oneOfType([
  arrayOfObjectColumns,
  arrayOfArrayColumns
]);
const rowKeyType = React.PropTypes.oneOfType([
  React.PropTypes.func,
  React.PropTypes.string
]);
const rowDataType = React.PropTypes.oneOfType([
  React.PropTypes.array,
  React.PropTypes.object
]);
const tableTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
};
const tableContextTypes = {
  headerRows: React.PropTypes.array.isRequired,
  bodyColumns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
};
const tableBodyDefaults = {
  onRow: () => {}
};
const tableBodyTypes = {
  onRow: React.PropTypes.func,
  rows: rowsType.isRequired,
  rowKey: rowKeyType
};
const tableBodyContextTypes = {
  bodyColumns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
};
const tableBodyRowDefaults = {
  onRow: () => ({})
};
const tableBodyRowTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object,
  onRow: React.PropTypes.func,
  rowIndex: React.PropTypes.number.isRequired,
  rowData: rowDataType.isRequired,
  rowKey: React.PropTypes.string.isRequired
};
const tableHeaderContextTypes = {
  headerRows: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
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
  tableHeaderContextTypes,
  tableDefaults
};
