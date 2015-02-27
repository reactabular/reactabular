'use strict';

var React = require('react/addons');


module.exports = () => {
    return React.createClass({
        render() {
            return <span>
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
        </span>;
        }
    });
};
