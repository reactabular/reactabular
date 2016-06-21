import React from 'react';

export default (attrs = {}) => {
  class Input extends React.Component {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.onBlur = this.onBlur.bind(this);
    }
    render() {
      return (
        <input
          defaultValue={this.props.value}
          onFocus={this.onFocus}
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
