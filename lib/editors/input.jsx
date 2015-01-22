'use strict';

var React = require('react');


module.exports = () => {
    return React.createClass({
        render() {
            return <input
                defaultValue={this.props.value}
                onKeyUp={this.keyUp}
                onBlur={this.done}>
            </input>;
        },

        keyUp(e) {
            if(e.keyCode === 13) {
                this.done();
            }
        },

        done() {
            this.props.onEdit(this.getDOMNode().value);
        },
    });
};
