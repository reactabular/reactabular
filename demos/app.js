'use strict';

var React = require('react');

var DemoTable = require('./demo_table.jsx');


var App = React.createClass({
    render() {
        return <div>
            <DemoTable></DemoTable>
        </div>;
    },
});

module.exports = App;
