'use strict';

var React = require('react');


module.exports = (attrs) => {
    attrs = attrs || {};

    return React.createClass({
        displayName: 'Input',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func,
        },

        getInitialState() {
            return {
                value: this.props.value,
            };
        },

        render() {
            return (
                <input
                    value={this.state.value}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    onKeyUp={this.keyUp}
                    onBlur={this.done}
                    {...attrs} />
            );
        },

        onFocus(e) {
            this.moveCaretToEnd(e.target);
        },

        moveCaretToEnd(field) {
            const length = field.value.length;
            field.selectionStart = length;
            field.selectionEnd = length;
        },

        onChange(e) {
            this.setState({
                value: e.target.value,
            });
        },

        keyUp(e) {
            if(e.keyCode === 13) {
                this.done();
            }
        },

        done() {
            this.props.onValue(this.getDOMNode().value);
        },
    });
};
