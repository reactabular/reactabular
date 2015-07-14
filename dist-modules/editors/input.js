'use strict';

var React = require('react/addons');

module.exports = function () {
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
            return React.createElement('input', {
                value: this.state.value,
                onChange: this.onChange,
                onKeyUp: this.keyUp,
                onBlur: this.done });
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