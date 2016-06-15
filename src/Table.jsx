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
      {columns.map((column, i) => (
        <Cell
          key={`${i}-header`}
          type="th"
          cell={column.header}
          cellKey="header"
          value={column.header || ''}
          column={column}
        />
      ))}
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
      columns.map((column, j) => (
        <Cell
          key={`${j}-cell`}
          type="td"
          cell={column.cell}
          cellKey={data[i][rowKey]}
          cellData={data[i]}
          value={r[column.property]}
          column={column}
        />
      ))
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

const Cell = ({
  type, column, cell, cellKey, cellData, value,
}) => (
  React.createElement(
    type,
    {},
    isFunction(cell) ?
      cell({ value, cellData, property: column.property, column, cellKey }) :
      <span>{value}</span>
  )
);
Cell.propTypes = {
  // array of react elements, react element, number, string, ...
  cell: React.PropTypes.any.isRequired,
  cellKey: React.PropTypes.any.isRequired,
  type: React.PropTypes.string.isRequired,
  column: React.PropTypes.object.isRequired,
  value: React.PropTypes.any,
  cellData: React.PropTypes.any,
};
Cell.defaultProps = {
  cell: [() => {}],
};

Table.Header = Header;
Table.Body = Body;

export default Table;
