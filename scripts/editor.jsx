'use strict';

var React = require('react');


var Editor = React.createClass({
    render() {
        return (
            <input
                defaultValue={this.props.value}
                onKeyUp={this.keyUp}
                onBlur={this.edited}>
            </input>
        );
    },

    keyUp(e) {
        if(e.keyCode === 13) {
            this.edited();
        }
    },

    edited() {
        (this.props.edited || noop)(this.getDOMNode().value);
    },
});

function noop() {}

module.exports = Editor;
