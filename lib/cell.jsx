'use strict';

var React = require('react');


module.exports = React.createClass({
    render() {
        var value = this.props.value || '';
        var formatter = this.props.formatter || id;
        var isEdited = this.props.isEdited || noop;
        var editor;

        if(this.props.editor && isEdited(value)) {
            editor = React.createElement(this.props.editor, {
                value: value,
                onValue: this.props.onValue
            });

            return <td>{editor}</td>
        }

        return <td onClick={this.props.onClick}>
            {formatter(value)}
        </td>;
    },
});

function id(a) {return a;}
function noop() {}
