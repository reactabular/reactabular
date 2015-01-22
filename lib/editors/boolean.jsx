'use strict';

var React = require('react');


module.exports = () => {
    return React.createClass({
        render() {
            return <span>
            <button
                disabled={this.props.value}
                onClick={this.props.onEdit.bind(null, true)}
            >&#10003;
            </button>
            <button
                disabled={!this.props.value}
                onClick={this.props.onEdit.bind(null, false)}
            >&#10007;
            </button>
        </span>;
        }
    });
};
