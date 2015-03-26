'use strict';

var React = require('react');


module.exports = React.createClass({
    displayName: 'SectionWrapper',

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
            <fieldset className={classes.join(' ')} key={this.props.key}>
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
