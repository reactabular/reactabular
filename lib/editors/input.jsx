'use strict';

var React = require('react/addons');


module.exports = () => {
    return React.createClass({
        displayName: 'Input',

        propTypes: {
            value: React.PropTypes.bool,
            onValue: React.PropTypes.func,
        },

        render() {
            return (
                <input
                    defaultValue={this.props.value}
                    onKeyUp={this.keyUp}
                    onBlur={this.done}>
                </input>
            );
        },

        keyUp(e) {
            if(e.keyCode === 13) {
                this.done();
            }
        },

        done() {
            this.props.onValue(this.getDOMNode().value);
        },
    });
};
