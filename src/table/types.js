import React from 'react';

const arrayOfObjectColumns = React.PropTypes.arrayOf(
  React.PropTypes.shape({
    header: React.PropTypes.shape({
      label: React.PropTypes.string,
      transforms: React.PropTypes.arrayOf(React.PropTypes.func),
      format: React.PropTypes.func,
      component: React.PropTypes.any, // XXX: too loose? createElement first param
      props: React.PropTypes.object
    }),
    cell: React.PropTypes.shape({
      property: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      transforms: React.PropTypes.arrayOf(React.PropTypes.func),
      format: React.PropTypes.func,
      resolve: React.PropTypes.func,
      component: React.PropTypes.any, // XXX: too loose? createElement first param
      props: React.PropTypes.object
    })
  })
);
const arrayOfArrayColumns = React.PropTypes.arrayOf(React.PropTypes.array);
const rowKeyType = (props, propName, componentName) => {
  if (props.data && props.data.length &&
    !arrayOfObjectColumns(props, 'data', componentName)) {
    return React.PropTypes.string.isRequired(props, propName, componentName);
  }

  // `columns` should be an array of arrays. If it's not, then that propType will
  // fail even if this doesn't.
  return null;
};
const dataType = React.PropTypes.oneOfType([
  arrayOfObjectColumns,
  arrayOfArrayColumns
]);
const tableTypes = {
  columns: React.PropTypes.array.isRequired,
  components: React.PropTypes.object,
  data: dataType.isRequired,
  rowKey: rowKeyType
};
const tableDefaults = {
  components: {
    table: 'table',
    header: {
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    }
  }
};

export {
  tableTypes,
  tableDefaults
};
