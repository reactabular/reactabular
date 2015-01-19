'use strict';

var React = require('react');


var Cell = React.createClass({
    getInitialState() {
        return {
            editing: false,
            value: null
        };
    },

    render() {
        var value = this.props.value || '';

        if(this.state && this.state.editing) {
            return (
                <input
                    defaultValue={value}
                    onKeyUp={this.keyUp}
                    onBlur={this.edited}>
                </input>
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

    keyUp(e) {
        if(e.keyCode === 13) {
            this.edited();
        }
    },

    edited() {
        (this.props.edited || noop)(this.getDOMNode().value);

        this.setState({
            editing: false
        });
    },
});

function noop() {}

module.exports = Cell;
