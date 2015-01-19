'use strict';

var React = require('react');


var Editor = React.createClass({
    render() {
        return (
            <input
                defaultValue={this.props.value}
                onKeyUp={this.keyUp}
                onBlur={this.done}>
            </input>
        );
    },

    keyUp(e) {
        if(e.keyCode === 13) {
            this.done();
        }
    },

    done() {
        (this.props.done || noop)(this.getDOMNode().value);
    },
});

function noop() {}

module.exports = Editor;
