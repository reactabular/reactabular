'use strict';

var React = require('react');

module.exports = (options, fields={}) => {
    const nameField = fields.name || 'name';
    const valueField = fields.value || 'value';

    return React.createClass({
        displayName: 'Dropdown',

        propTypes: {
            value: React.PropTypes.string,
            onValue: React.PropTypes.func,
        },

        render() {
            const edit = (e) => this.props.onValue(e.target.value);

            return (
                <select onBlur={edit} onChange={edit} value={this.props.value}>
                    {options.map((option, i) =>
                        <option
                            key={i}
                            value={option[valueField]}
                        >{option[nameField]}</option>
                    )}
                </select>
            );
        }
    });
};
