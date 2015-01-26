'use strict';

var React = require('react');


module.exports = React.createClass({
    render() {
        var value = this.props.value || '';
        var formatter = this.props.formatter || id;
        var isEdited = this.props.isEdited || noop;
        var editor;

        if(isEdited(value)) {
            editor = React.createElement(this.props.editor, {
                value: value,
                onEdit: this.edited
            });

            return <td>{editor}</td>
        }

        return <td onClick={this.edit}>
            {formatter(value)}
        </td>;
    },

    edit() {
        (this.props.startEdit || noop)();
    },

    edited(value) {
        (this.props.endEdit || noop)(value);
    },
});

function id(a) {return a;}
function noop() {}
