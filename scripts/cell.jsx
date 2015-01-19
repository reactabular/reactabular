'use strict';

var React = require('react');

var Editor = require('./editor.jsx');


var Cell = React.createClass({
    getInitialState() {
        return {
            editing: false,
        };
    },

    render() {
        var value = this.props.value || '';
        var editor = Editor;

        if(this.state && this.state.editing) {
            return (
                <Editor value={value} edited={this.edited}></Editor>
            );
        }

        return (
            <td onClick={this.edit}>
                {value}
            </td>
        );
    },

    edit() {
        if(this.props.editable) {
            this.setState({
                editing: true
            });
        }
    },

    edited(value) {
        (this.props.edited || noop)(value);

        this.setState({
            editing: false
        });
    },
});

function noop() {}

module.exports = Cell;
