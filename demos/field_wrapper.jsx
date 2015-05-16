'use strict';

var React = require('react');


module.exports = React.createClass({
    displayName: 'FieldWrapper',

    propTypes: {
        errors: React.PropTypes.array,
        classes: React.PropTypes.array,
        key: React.PropTypes.string,
        title: React.PropTypes.string,
        children: React.PropTypes.object,
    },

    render() {
        var errors = (this.props.errors || []).join('\n');
        var classes = [].concat(errors ? 'error' : [],
            'form-element',
            this.props.classes || []);

        classes.push('pure-control-group');

        return (
            <div className={classes.join(' ')} key={this.props.key}>
                <label htmlFor={this.props.key}>{this.props.title}</label>
                {this.props.children}
            </div>
        );
    }
});
