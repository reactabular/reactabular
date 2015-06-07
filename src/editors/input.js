'use strict';

var React = require('react/addons');


module.exports = () => {
    return React.createClass({
        displayName: 'Input',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func,
        },

        getInitialState() {
            return {
                value: this.props.value,
            };
        },

        render() {
            return (
                <input
                    value={this.state.value }
                    onChange={this.onChange}
                    onKeyUp={this.keyUp}
                    onBlur={this.done}>
                </input>
            );
        },

        onChange(e) {
            this.setState({
                value: e.target.value,
            });
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
