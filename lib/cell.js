'use strict';

var React = require('react');


module.exports = function(context, o) {
    var formatter = o.formatter || id;
    var editor = o.editor;

    return (property, value, rowIndex, columnIndex) => {
        var idx = rowIndex.toString() + '-' + columnIndex.toString();
        var i = context.state.editedCells.indexOf(idx);

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
        var formattedValue = formatter(value, rowIndex);

        if(editor) {
            return {
                onClick: () => {
                    var editedCells = context.state.editedCells;

                    editedCells.push(idx);

                    context.setState({
                        editedCells: editedCells
                    });
                },
                value: formattedValue
            };
        }

        return {
            value: formattedValue
        };
    };
};

function id(a) {return a;}
