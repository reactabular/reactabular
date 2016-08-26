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
const tableTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
};
const tableContextTypes = {
  headerRows: React.PropTypes.array.isRequired,
  bodyColumns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
};
const tableBodyTypes = {
  onRow: React.PropTypes.func,
  rows: rowsType.isRequired,
  rowKey: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string
  ])
};
const tableBodyContextTypes = {
  bodyColumns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object
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
  tableBodyContextTypes,
  tableHeaderContextTypes,
  tableDefaults
};
