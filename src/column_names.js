'use strict';

var _ = require('lodash');
var reduce = _.reduce;
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

                    return (
                        <th
                            key={i + '-header'}
                            {...columnHeader}
                        >{column.header}</th>
                    );
                })}
            </tr>
        );
    }

});
