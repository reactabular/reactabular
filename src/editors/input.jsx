import React from 'react';

export default (attrs = {}) => {
  class Input extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: props.value,
      };

      this.onFocus = this.onFocus.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.done = this.done.bind(this);
    }
    render() {
      return (
        <input
          ref="input"
          value={this.state.value}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onBlur={this.done}
          {...attrs}
        />
      );
    }
    onFocus({ target }) {
      const length = target.value.length;

      target.selectionStart = length; // eslint-disable-line no-param-reassign
      target.selectionEnd = length; // eslint-disable-line no-param-reassign
    }
    onChange({ target: { value } }) {
      this.setState({ value });
    }
    onKeyUp({ keyCode }) {
      if (keyCode === 13) {
        this.done();
      }
    }
    done() {
      this.props.onValue(this.refs.input.value);
    }
  }
  Input.propTypes = {
    value: React.PropTypes.string,
    onValue: React.PropTypes.func,
  };

  return Input;
};
