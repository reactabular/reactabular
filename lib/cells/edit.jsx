'use strict';

var React = require('react/addons');


module.exports = function(o) {
    var context = this;
    var editor = o.editor;

    return (value, data, rowIndex, property) => {
        var idx = rowIndex.toString() + '-' + property;
        var editedCells = context.state.editedCells || [];
        var i = editedCells.indexOf(idx);

        if(i >= 0) {
            var editorElement = React.createElement(editor, {
                value: value,
                onValue: (value) => {
                    var data = context.state.data;
                    var editedCells = context.state.editedCells;

                    editedCells.splice(idx, 1);

                    data[rowIndex][property] = value;

                    context.setState({
                        data: data,
                        editedCells: editedCells,
                    });
                }
            });

            return {
                value: editorElement
            };
        }

        if(editor) {
            return {
                onClick: () => {
                    var editedCells = context.state.editedCells;

                    editedCells.push(idx);

                    context.setState({
                        editedCells: editedCells
                    });
                },
                value: value
            };
        }

        return {
            value: value
        };
    };
};
