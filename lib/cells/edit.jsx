'use strict';

var React = require('react/addons');


module.exports = function(editProperty, o) {
    var context = this;
    var editor = o.editor;

    return (value, data, rowIndex, property) => {
        var idx = rowIndex.toString() + '-' + property;
        var editedCell = context.state[editProperty];

        if(editedCell === idx) {
            var editorElement = React.createElement(editor, {
                value: value.original,
                onValue: (value) => {
                    data[rowIndex][property] = value;

                    var o = {
                        data: data
                    };

                    o[editProperty] = null;

                    context.setState(o);
                }
            });

            return {
                value: editorElement
            };
        }

        if(editor) {
            return {
                onClick: () => {
                    var o = {};

                    o[editProperty] = idx;

                    context.setState(o);
                },
                value: value.formatted
            };
        }

        return {
            value: value.formatted
        };
    };
};
