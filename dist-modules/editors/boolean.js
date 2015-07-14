'use strict';

var React = require('react/addons');

module.exports = function () {
    return React.createClass({
        displayName: 'Boolean',

        propTypes: {
            value: React.PropTypes.string,
            onClick: React.PropTypes.func,
            onValue: React.PropTypes.func
        },

        render: function render() {
            return React.createElement(
                'span',
                null,
                React.createElement(
                    'button',
                    {
                        disabled: this.props.value,
                        onClick: this.props.onValue.bind(null, true)
                    },
                    '✓'
                ),
                React.createElement(
                    'button',
                    {
                        disabled: !this.props.value,
                        onClick: this.props.onValue.bind(null, false)
                    },
                    '✗'
                )
            );
        }
    });
};