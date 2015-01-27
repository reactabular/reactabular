'use strict';

var React = require('react');


module.exports = (options) => {
    return React.createClass({
        render() {
            var edit = (e) => this.props.onValue(e.target.value);

            return <select onBlur={edit} onChange={edit} value={this.props.value}>
            {options.map((option, i) =>
                <option
                    key={i}
                    value={option.value}
                >{option.name}</option>
            )}
        </select>;
        }
    });
};
