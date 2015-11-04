'use strict';

var _ = require('lodash');

var React = require('react');

module.exports = React.createClass({
    displayName: 'ColumnFilters',

    propTypes: {
        columns: React.PropTypes.array
    },

    // this is just an example of a possible custom header component...
    // inputs does nothing right now (but we can implement filtering or insertion here)
    render() {
        const columns = this.props.columns;

        return(
            <tr>
                {columns.map((column, i) => {
                    return (
                        <td key={i + '-custom-header'}>
                            {column.property ? <input className="header-input" placeholder={'Insert '+column.property} /> : ''}
                        </td>
                    );
                })}
            </tr>
        );
    }

});
