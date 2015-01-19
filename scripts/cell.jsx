'use strict';

var React = require('react');


var Cell = React.createClass({
    render() {
        var value = this.props.value || '';

        return (
            <td>
                {value}
            </td>
        );
    }
});

module.exports = Cell;
