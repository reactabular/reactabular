'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react/addons');

module.exports = function (attrs) {
    attrs = attrs || {};

    return React.createClass({
        displayName: 'Input',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func
        },

        getInitialState: function getInitialState() {
            return {
                value: this.props.value
            };
        },

        render: function render() {
            return React.createElement('input', _extends({
                value: this.state.value,
                onFocus: this.onFocus,
                onChange: this.onChange,
                onKeyUp: this.keyUp,
                onBlur: this.done
            }, attrs));
        },

        onFocus: function onFocus(e) {
            this.moveCaretToEnd(e.target);
        },

        moveCaretToEnd: function moveCaretToEnd(field) {
            var length = field.value.length;
            field.selectionStart = length;
            field.selectionEnd = length;
        },

        onChange: function onChange(e) {
            this.setState({
                value: e.target.value
            });
        },

        keyUp: function keyUp(e) {
            if (e.keyCode === 13) {
                this.done();
            }
        },

        done: function done() {
            this.props.onValue(this.getDOMNode().value);
        }
    });
};