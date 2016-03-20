'use strict';
var reduce = require('lodash/reduce');
var React = require('react');

module.exports = React.createClass({
    displayName: 'ColumnNames',

    propTypes: {
        config: React.PropTypes.object,
        columns: React.PropTypes.array
    },

    render() {
        const config = this.props.config;
        const columns = this.props.columns;

        return(
            <tr>
                {columns.map((column, i) => {
                    var columnHeader = reduce(config, (result, v, k) => {
                        result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;

                        return result;
                    }, {});
                    var {className, ...props} = columnHeader;

                    // sort column - XXX: tidy up somehow, maybe
                    // there should be access to header specific classes?
                    className = className || '';
                    className += ' ' + column.headerClass;

                    return (
                        <th
                            key={i + '-header'}
                            className={className}
                            {...props}
                        >{column.header}</th>
                    );
                })}
            </tr>
        );
    }
});
