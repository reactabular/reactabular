'use strict';

var React = require('react/addons');


module.exports = (options) => {
    return React.createClass({
        displayName: 'Dropdown',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func,
        },

        render() {
            var edit = (e) => this.props.onValue(e.target.value);

            return (
                <select onBlur={edit} onChange={edit} value={this.props.value}>
                    {options.map((option, i) =>
                        <option
                            key={i}
                            value={option.value}
                        >{option.name}</option>
                    )}
                </select>
            );
        }
    });
};
