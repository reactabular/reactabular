'use strict';

var React = require('react/addons');

module.exports = function (options) {
    var fields = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var nameField = fields.name || 'name';
    var valueField = fields.value || 'value';

    return React.createClass({
        displayName: 'Dropdown',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func
        },

        render: function render() {
            var _this = this;

            var edit = function edit(e) {
                return _this.props.onValue(e.target.value);
            };

            return React.createElement(
                'select',
                { onBlur: edit, onChange: edit, value: this.props.value },
                options.map(function (option, i) {
                    return React.createElement(
                        'option',
                        {
                            key: i,
                            value: option[valueField]
                        },
                        option[nameField]
                    );
                })
            );
        }
    });
};