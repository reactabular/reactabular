import get from 'lodash/get';
import has from 'lodash/has';
import merge from 'lodash/merge';
import React from 'react';

class Table extends React.Component {
  getChildContext() {
    return {
      columns: this.props.columns,
      data: this.props.data,
      rowKey: this.props.rowKey
    };
  }
  render() {
    const {
      columns, data, children, ...props // eslint-disable-line no-unused-vars
    } = this.props;

    return <table {...props}>{children}</table>;
  }
}
Table.propTypes = {
  columns: React.PropTypes.arrayOf(
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
  ).isRequired,
  data: React.PropTypes.array.isRequired,
  // TODO: if data is an array of arrays instead of an array of objects,
  // then rowKey isn't required
  rowKey: React.PropTypes.string.isRequired,
  children: React.PropTypes.any
};
Table.childContextTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired
};

const Header = ({ children, className, ...props }, { columns }) => (
  <thead {...props}>{
    resolveHeaderRows(columns).map((headerRow, i) => (
      <tr key={`${i}-header-row`}>{
        headerRow.map((column, j) => {
          const columnProps = column.props || {};
          const {
            label,
            transforms = [() => ({})],
            format = a => a,
            component = 'th',
            props // eslint-disable-line no-shadow
          } = column.header || {};
          const extraParameters = {
            cellData: label,
            columnIndex: j,
            column
          };
          const key = `${j}-header`;
          const transformed = evaluateTransforms(transforms, label, extraParameters);

          if (!transformed) {
            console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
          }

          const mergedClassName = mergeClassNames(
            className, transformed && transformed.className
          );

          return React.createElement(
            component,
            {
              key,
              ...columnProps,
              ...props,
              ...transformed,
              ...{ className: mergedClassName }
            },
            transformed.children || format(label, extraParameters)
          );
        })
      }
      </tr>
    )
  )}
  {children}
  </thead>
);
Header.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string
};
Header.contextTypes = {
  columns: React.PropTypes.array.isRequired
};
Header.displayName = 'Table.Header';

function resolveHeaderRows(columns) {
  let children = [];

  const ret = columns.map(column => {
    if (column.children && column.children.length) {
      children = children.concat(
        resolveHeaderRows(column.children)[0]
      );

      return {
        ...column,
        props: {
          ...column.props,
          colSpan: countChildren(column.children)
        }
      };
    }

    return column;
  });

  if (children.length) {
    return [ret].concat([children]);
  }

  return [ret];
}

function countChildren(children) {
  if (children.children) {
    return children.length + countChildren(children.children);
  }

  return children.length;
}

const Body = ({ row, className, ...props }, { columns, data, rowKey }) => {
  const dataColumns = resolveBodyColumns(columns);

  return (
    <tbody {...props}>{
      data.map((r, i) => <tr key={`${r[rowKey] || i}-row`} {...row(r, i)}>{
        dataColumns.map((column, j) => {
          const columnProps = column.props || {};
          const {
            property,
            transforms = [() => ({})],
            format = a => a,
            resolve = a => a,
            component = 'td',
            props // eslint-disable-line no-shadow
          } = column.cell || {};
          if (property && !has(r, property)) {
            console.warn(`Table.Body - Failed to find "${property}" property from`, r); // eslint-disable-line max-len, no-console
          }

          const extraParameters = {
            cellData: data[i],
            columnIndex: j,
            column,
            rowIndex: i,
            property
          };
          const value = get(r, property);
          const resolvedValue = resolve(value, extraParameters);
          const transformed = evaluateTransforms(transforms, value, extraParameters);

          if (!transformed) {
            console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
          }

          const mergedClassName = mergeClassNames(
            className, transformed && transformed.className
          );

          return React.createElement(
            component,
            {
              key: `${j}-cell`,
              ...columnProps,
              ...props,
              ...transformed,
              ...{ className: mergedClassName }
            },
            transformed.children || format(resolvedValue, extraParameters)
          );
        })
      }</tr>)
    }</tbody>
  );
};
Body.propTypes = {
  row: React.PropTypes.func,
  className: React.PropTypes.string
};
Body.defaultProps = {
  row: () => {}
};
Body.contextTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired
};
Body.displayName = 'Table.Body';

function resolveBodyColumns(columns) {
  let ret = [];

  columns.forEach(column => {
    // If a column has children, skip cell specific configuration
    if (column.children) {
      ret = ret.concat(resolveBodyColumns(column.children));
    } else {
      ret.push(column);
    }
  });

  return ret;
}

function evaluateTransforms(transforms, value, extraParameters) {
  return transforms.reduceRight(
    (a, t) => {
      const result = t(value, extraParameters);

      return merge({}, a, result, {
        className: mergeClassNames(a.className, result.className)
      });
    },
    {}
  );
}

function mergeClassNames(a, b) {
  if (a && b) {
    return `${a} ${b}`;
  }

  // Either a or b at this point
  return (a || '') + (b || '');
}

Table.Header = Header;
Table.Body = Body;

export default Table;
