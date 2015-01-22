'use strict';

var React = require('react');


module.exports = React.createClass({
    getInitialState() {
        return {
            editing: false,
        };
    },

    render() {
        var value = this.props.value || '';
        var formatter = this.props.formatter || id;

        if(this.state && this.state.editing) {
            return React.createElement(this.props.editor, {
                value: value,
                onEdit: this.edited
            });
        }

        return <td onClick={this.edit}>
            {formatter(value)}
        </td>;
    },

    edit() {
        if(this.props.editor) {
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

function id(a) {return a;}
function noop() {}
