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
      this.onBlur = this.onBlur.bind(this);
    }
    render() {
      return (
        <input
          value={this.state.value}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onBlur={this.onBlur}
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
    onKeyUp({ target: { value }, keyCode }) {
      if (keyCode === 13) {
        this.props.onValue(value);
      }
    }
    onBlur({ target: { value } }) {
      this.props.onValue(value);
    }
  }
  Input.propTypes = {
    value: React.PropTypes.string,
    onValue: React.PropTypes.func,
  };

  return Input;
};
