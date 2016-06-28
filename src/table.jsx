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
        props: React.PropTypes.object
      }),
      cell: React.PropTypes.shape({
        property: React.PropTypes.string,
        transforms: React.PropTypes.arrayOf(React.PropTypes.func),
        format: React.PropTypes.func,
        resolve: React.PropTypes.func,
        props: React.PropTypes.object
      })
    })
  ).isRequired,
  data: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  children: React.PropTypes.any
};
Table.childContextTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired
};

const Header = ({ children, className, ...props }, { columns }) => (
  <thead {...props}>
    <tr>
      {columns.map((column, i) => {
        const {
          label,
          transforms = [() => ({})],
          format = a => a,
          props // eslint-disable-line no-shadow
        } = column.header || {};
        const extraParameters = { cellData: label, column };
        const key = `${i}-header`;
        const transformed = evaluateTransforms(transforms, label, extraParameters);

        if (!transformed) {
          console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
        }

        const mergedClassName = mergeClassNames(
          className, transformed && transformed.className
        );

        return (
          <th
            key={key}
            {
              ...{ ...props, ...transformed, ...{ className: mergedClassName } }
            }
          >
            {transformed.children || format(label, extraParameters)}
          </th>
        );
      })}
    </tr>
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

const Body = ({ row, className, ...props }, { columns, data, rowKey }) => (
  <tbody {...props}>{
    data.map((r, i) => <tr key={`${r[rowKey] || i}-row`} {...row(r, i)}>{
      columns.map((column, j) => {
        const {
          property,
          transforms = [() => ({})],
          format = a => a,
          resolve = a => a,
          props // eslint-disable-line no-shadow
        } = column.cell;
        if (property && !has(r, property)) {
          console.warn(`Table.Body - Failed to find "${property}" property from`, r); // eslint-disable-line max-len, no-console
        }

        const extraParameters = { cellData: data[i], column, property };
        const value = get(r, property);
        const resolvedValue = resolve(value, extraParameters);
        const transformed = evaluateTransforms(transforms, value, extraParameters);

        if (!transformed) {
          console.warn('Table.Body - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
        }

        const mergedClassName = mergeClassNames(
          className, transformed && transformed.className
        );

        return (
          <td
            key={`${j}-cell`}
            {
              ...{ ...props, ...transformed, ...{ className: mergedClassName } }
            }
          >
            {transformed.children || format(resolvedValue, extraParameters)}
          </td>
        );
      })
    }</tr>)
  }</tbody>
);
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
