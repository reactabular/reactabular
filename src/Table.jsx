import reduce from 'lodash/reduce';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

class Context extends React.Component {
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
Context.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  children: React.PropTypes.any,
};
Context.childContextTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
};

const Header = ({ cell, children, ...props }, { columns }) => (
  <thead {...props}>
    <tr>
      {columns.map((column, i) => (
        <Cell
          key={`${i}-header`}
          type="th"
          cell={cell}
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
  cell: React.PropTypes.array,
  children: React.PropTypes.any,
};
Header.defaultProps = {
  cell: [],
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

/*
// TODO
// Bind column to "on" handlers
const columnHeader = reduce(header, (result, v, k) => ({
  ...result,
  [k]: k.indexOf('on') === 0 ? v.bind(null, column) : v,
}), {});
 */

const Cell = ({
  type, column, cell, cellKey, cellData, value,
}) => {
  const property = column.property;
  let content;

  content = reduce(isFunction(cell) ? [cell] : cell, (v, fn) => {
    if (React.isValidElement(v.value)) {
      return v;
    }
    let val;

    if (isFunction(fn)) {
      val = fn(v.value, cellKey, cellData, property);
    }

    if (!isPlainObject(val) || isUndefined(val.value)) {
      // formatter shortcut
      val = { value: val };
    }

    return {
      value: isUndefined(val.value) ? v.value : val.value,
      props: { ...v.props, ...val.props },
    };
  }, { value, props: {} });

  content = content || {};

  return React.createElement(
    type, content.props, content.value
  );
};
Cell.propTypes = {
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

const Table = {
  Context,
  Header,
  Body,
};

export default Table;
