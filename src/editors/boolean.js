'use strict';

var React = require('react');


module.exports = () => {
    return React.createClass({
        displayName: 'Boolean',

        propTypes: {
            value: React.PropTypes.string,
            onClick: React.PropTypes.func,
            onValue: React.PropTypes.func,
        },

        render() {
            return (
                <span>
                    <button
                        disabled={this.props.value}
                        onClick={this.props.onValue.bind(null, true)}
                    >&#10003;
                    </button>
                    <button
                        disabled={!this.props.value}
                        onClick={this.props.onValue.bind(null, false)}
                    >&#10007;
                    </button>
                </span>
            );
        }
    });
};
