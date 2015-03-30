'use strict';

var React = require('react/addons');


module.exports = function(editProperty, onValue, o) {
    onValue = onValue || noop;

    var context = this;
    var editor = o.editor;

    return (value, data, rowIndex, property) => {
        var idx = rowIndex.toString() + '-' + property;
        var editedCell = context.state[editProperty];

        if(editedCell === idx) {
            return {
                value: React.createElement(editor, {
                    value: value,
                    onValue: (value) => {
                        var o = {};

                        o[editProperty] = null;

                        context.setState(o);

                        onValue(value, data, rowIndex, property);
                    }
                }),
            };
        }

        if(editor) {
            return {
                value: value,
                props: {
                    onClick: () => {
                        var o = {};

                        o[editProperty] = idx;

                        context.setState(o);
                    },
                }
            };
        }

        return value;
    };
};

function noop() {}
