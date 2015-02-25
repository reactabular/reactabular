'use strict';

var React = require('react');


module.exports = function(o) {
    var context = this;
    var formatter = o.formatter || id;
    var editor = o.editor;

    return (value, data, rowIndex, property) => {
        var idx = rowIndex.toString() + '-' + property;
        var editedCells = context.state.editedCells || [];
        var i = editedCells.indexOf(idx);
        var formattedValue = formatter(value);

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
                searchValue: formattedValue,
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
                searchValue: formattedValue,
                value: formattedValue
            };
        }

        return {
            searchValue: formattedValue,
            value: formattedValue
        };
    };
};

function id(a) {return a;}
