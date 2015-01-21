'use strict';

var React = require('react');


var Cell = React.createClass({
    getInitialState() {
        return {
            editing: false,
        };
    },

    render() {
        var value = this.props.value || '';
        var formatter = this.props.formatter || id;

        if(this.state && this.state.editing) {
            return this.props.editor(value, this.edited);
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

module.exports = Cell;
