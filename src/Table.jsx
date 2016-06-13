import reduce from 'lodash/reduce';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

const Table = ({data, columns, rowKey, row, children, ...props}) => (
    <table {...props}>
        <tbody>
            {data.map((r, i) => <tr key={(r[rowKey] || i) + '-row'} {...row(r, i)}>{
                columns.map((column, j) => {
                    var property = column.property;
                    var value = r[property];
                    var cell = column.cell || [() => {}];
                    var content;

                    cell = isFunction(cell) ? [cell] : cell;

                    content = reduce(cell, (v, fn) => {
                        if(React.isValidElement(v.value)) {
                            return v;
                        }

                        var val = fn(v.value, data, i, property);

                        if(!isPlainObject(val) || isUndefined(val.value)) {
                            // formatter shortcut
                            val = {value: val};
                        }

                        return {
                            value: isUndefined(val.value) ? v.value : val.value,
                            props: {...v.props, ...val.props}
                        };
                    }, {value: value, props: {}});

                    content = content || {};

                    return <td key={j + '-cell'} {...content.props}>{content.value}</td>;
                }
            )}</tr>)}
        </tbody>
        {children}
    </table>
);
Table.propTypes = {
    data: React.PropTypes.array,
    columns: React.PropTypes.array,
    row: React.PropTypes.func,
    children: React.PropTypes.node,
    rowKey: React.PropTypes.string.isRequired
};
Table.defaultProps = {
    data: [],
    columns: [],
    row: () => {}
};

class Context extends React.Component {
    getChildContext() {
        return {
            columns: this.props.columns,
            data: this.props.data
        };
    }
    render() {
        const {columns, data, children, ...props} = this.props;

        return <table {...props}>{children}</table>
    }
}
Context.propTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.array,
    children: React.PropTypes.any
};
Context.childContextTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.array
};
Table.Context = Context;

const Header = ({cell, ...props}, {columns}) => (
    <thead {...props}>
        <tr>
            {columns.map((column, i) => {
                // Bind column to "on" handlers
                var columnHeader = reduce(cell, (result, v, k) => {
                    result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;

                    return result;
                }, {});

                return (
                    <th
                        key={i + '-header'}
                        {...columnHeader}
                    >{column.header}</th>
                );
            })}
        </tr>
    </thead>
);
Header.propTypes = {
    cell: React.PropTypes.func
};
Header.defaultProps = {
    header: () => {}
};
Header.contextTypes = {
    columns: React.PropTypes.array.isRequired
};
Table.Header = Header;

const Rows = ({cell, cellKey, ...props}, {data}) => (
    <tbody {...props}>table rows should go here</tbody>
);
Rows.propTypes = {
    cell: React.PropTypes.func,
    cellKey: React.PropTypes.string.isRequired
};
Rows.defaultProps = {
    row: () => {}
};
Rows.contextTypes = {
    data: React.PropTypes.array.isRequired
};
Table.Rows = Rows;

export default Table;
