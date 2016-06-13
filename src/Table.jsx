import reduce from 'lodash/reduce';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

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

const Header = ({header, ...props}, {columns}) => (
    <thead {...props}>
        <tr>
            {columns.map((column, i) => {
                // Bind column to "on" handlers
                var columnHeader = reduce(header, (result, v, k) => {
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
    header: React.PropTypes.func
};
Header.defaultProps = {
    header: () => {}
};
Header.contextTypes = {
    columns: React.PropTypes.array.isRequired
};

const Body = ({row, rowKey, ...props}, {columns, data}) => (
    <tbody {...props}>{
        data.map((r, i) => <tr key={(r[rowKey] || i) + '-row'} {...row(r, i)}>{
            columns.map((column, j) => {
                const property = column.property;
                const value = r[property];
                let cell = column.cell || [() => {}];
                let content;

                cell = isFunction(cell) ? [cell] : cell;

                content = reduce(cell, (v, fn) => {
                    if(React.isValidElement(v.value)) {
                        return v;
                    }

                    let val = fn(v.value, data, i, property);

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
        )}</tr>)
    }</tbody>
);
Body.propTypes = {
    row: React.PropTypes.func,
    rowKey: React.PropTypes.string.isRequired
};
Body.defaultProps = {
    row: () => {}
};
Body.contextTypes = {
    columns: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired
};

const Table = {
    Context,
    Header,
    Body
};

export default Table;
