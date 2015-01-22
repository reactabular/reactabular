'use strict';

var React = require('react');


module.exports = (options) => {
    return React.createClass({
        render() {
            return <select
                onChange={(e) => this.props.onEdit(e.target.value)}
                value={this.props.value}>
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
