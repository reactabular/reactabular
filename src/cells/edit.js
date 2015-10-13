'use strict';

var React = require('react');


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
                    onValue: (v) => {
                        var state = {};

                        state[editProperty] = null;

                        context.setState(state);

                        onValue(v, data, rowIndex, property);
                    }
                }),
            };
        }

        if(editor) {
            return {
                value: value,
                props: {
                    onClick: () => {
                        var state = {};

                        state[editProperty] = idx;

                        context.setState(state);
                    },
                }
            };
        }

        return value;
    };
};

function noop() {}
