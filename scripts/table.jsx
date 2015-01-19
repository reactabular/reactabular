'use strict';

var React = require('react');


var Table = React.createClass({
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Header content 1</th>
                        <th>Header content 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Body content 1</td>
                        <td>Body content 2</td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

module.exports = Table;