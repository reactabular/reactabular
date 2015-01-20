'use strict';

var React = require('react');


var Search = React.createClass({
    render() {
        return <input onChange={this.change}></input>
    },

    change(e) {
        (this.props.onQuery || noop)(this.getDOMNode().value);
    },
});

function noop() {}

module.exports = Search;
