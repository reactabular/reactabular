'use strict';

var React = require('react/addons');

module.exports = function (editProperty, _onValue, o) {
    _onValue = _onValue || noop;

    var context = this;
    var editor = o.editor;

    return function (value, data, rowIndex, property) {
        var idx = rowIndex.toString() + '-' + property;
        var editedCell = context.state[editProperty];

        if (editedCell === idx) {
            return {
                value: React.createElement(editor, {
                    value: value,
                    onValue: function onValue(v) {
                        var state = {};

                        state[editProperty] = null;

                        context.setState(state);

                        _onValue(v, data, rowIndex, property);
                    }
                })
            };
        }

        if (editor) {
            return {
                value: value,
                props: {
                    onClick: function onClick() {
                        var state = {};

                        state[editProperty] = idx;

                        context.setState(state);
                    }
                }
            };
        }

        return value;
    };
};

function noop() {}