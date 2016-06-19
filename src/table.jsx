import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import React from 'react';

class Table extends React.Component {
  getChildContext() {
    return {
      columns: this.props.columns,
      data: this.props.data,
    };
  }
  render() {
    const {
      columns, data, children, ...props, // eslint-disable-line no-unused-vars
    } = this.props;

    return <table {...props}>{children}</table>;
  }
}
Table.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  children: React.PropTypes.any,
};
Table.childContextTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
};

const Header = ({ children, ...props }, { columns }) => (
  <thead {...props}>
    <tr>
      {columns.map((column, i) => {
        const cell = column.header;
        const value = column.header || '';
        const key = `${i}-header`;

        return (
          <th key={key}>{isFunction(cell) ?
            cell({
              cell,
              value,
              property: column.property,
              cellKey: key,
            }) :
            value
          }</th>
        );
      })}
    </tr>
    {children}
  </thead>
);
Header.propTypes = {
  children: React.PropTypes.any,
};
Header.contextTypes = {
  columns: React.PropTypes.array.isRequired,
};

const Body = ({ row, rowKey, ...props }, { columns, data }) => (
  <tbody {...props}>{
    data.map((r, i) => <tr key={`${r[rowKey] || i}-row`} {...row(r, i)}>{
      columns.map((column, j) => {
        const propertyValue = get(r, column.property);
        const cell = column.cell;
        const value = column.value ? column.value(propertyValue) : propertyValue;
        const cellData = data[i];

        return (
          <td key={`${j}-cell`}>{isFunction(cell) ?
            cell({
              cell,
              value,
              cellData,
              property: column.property,
              cellKey: cellData[rowKey],
            }) :
            value
          }</td>
        );
      })
    }</tr>)
  }</tbody>
);
Body.propTypes = {
  row: React.PropTypes.func,
  rowKey: React.PropTypes.string.isRequired,
};
Body.defaultProps = {
  row: () => {},
};
Body.contextTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
};

Table.Header = Header;
Table.Body = Body;

export default Table;
