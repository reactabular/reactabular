'use strict';

var React = require('react');


module.exports = () => {
    return (active, done) => {
        return React.createElement(React.createClass({
            render() {
                return <input
                    defaultValue={active}
                    onKeyUp={this.keyUp}
                    onBlur={this.done}>
                </input>;
            },

            keyUp(e) {
                if(e.keyCode === 13) {
                    this.done();
                }
            },

            done() {
                done(this.getDOMNode().value);
            },
        }));
    };
};
