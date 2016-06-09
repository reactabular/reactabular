import React from 'react';

export default React.createClass({
    displayName: 'FieldWrapper',

    propTypes: {
        errors: React.PropTypes.array,
        classes: React.PropTypes.array,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        children: React.PropTypes.node,
    },

    render() {
        var errors = (this.props.errors || []).join('\n');
        var classes = [].concat(errors ? 'error' : [],
            'form-element',
            this.props.classes || []);

        classes.push('pure-control-group');

        return (
            <div className={classes.join(' ')} key={this.props.label}>
                <label htmlFor={this.props.label}>{this.props.title}</label>
                {this.props.children}
            </div>
        );
    }
});
