import React from 'react';

export default React.createClass({
    displayName: 'SectionWrapper',

    propTypes: {
        errors: React.PropTypes.array,
        path: React.PropTypes.array,
        classes: React.PropTypes.array,
        description: React.PropTypes.string,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        children: React.PropTypes.node,
    },

    render() {
        var errors = (this.props.errors || []).join('\n');
        var level = this.props.path.length;
        var classes = [].concat(errors ? 'error' : [],
            'form-section',
            (level > 0 ? 'form-subsection' : []),
            this.props.classes || []);
        var helpClasses = 'form-help' + (this.props.description ? '' : ' hidden');
        var errorClasses = 'form-error' + (errors ? '' : ' hidden');

        return (
            <fieldset className={classes.join(' ')} key={this.props.label}>
                <legend className="form-section-title">
                    {this.props.title}
                    <span className={helpClasses} title={this.props.description}>?</span>
                    <span className={errorClasses} title={errors}>!</span>
                </legend>
                {this.props.children}
            </fieldset>
        );
    }
});
