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

const Context = () => (
    <div>table should go here</div>
);
Table.Context = Context;

const Header = () => (
    <div>table header should go here</div>
);
Table.Header = Header;

const Rows = () => (
    <div>table rows should go here</div>
);
Table.Rows = Rows;

export default Table;
