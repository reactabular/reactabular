'use strict';

var _ = require('lodash');
var reduce = _.reduce;
var React = require('react/addons');
var cx = require('classnames');

module.exports = React.createClass({

    displayName: 'Header',

    render() {
        const headerConfig = this.props.config;
        const columns = this.props.columns;

        return(
            <tr>
                {columns.map((column, i) => {
                    var columnHeader = reduce(headerConfig, (result, v, k) => {
                        result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;

                        return result;
                    }, {});

                    return (
                        <th
                            key={i + '-header'}
                            className={cx(column.classes)}
                            {...columnHeader}
                        >{column.header}</th>
                    );
                })}
            </tr>
        );
    }

});
